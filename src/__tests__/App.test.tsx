import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import App from "../App";
import buildTree from '../lib/buildTree';
import { locations, assets } from '../tests-data/APIData';
import { filterNode, flattenTree } from '../lib/filterAndFlattenTree';
import removeNullChildren from '../lib/removeNullChildren';
import { ITreeNode } from '../types/TreeNodes';

test("Renders main react component correctly", () => {
	const snapshot = render(<App />);
	expect(snapshot.asFragment()).toMatchSnapshot();
});

test('Build tree - It should build the tree correctly and return the nodes', () => {
	expect(Array.isArray(buildTree({ locations, assets }))).toBe(true);
	expect(buildTree({ locations, assets }).length).toBe(1);
	expect(buildTree({ locations, assets })[0].children.length).toBe(2);
	expect(buildTree({ locations, assets })[0].children.find(node => node.id === '656734968eb037001e474d5a')?.children.length).toBe(1);
});

test('Filter tree - It should filter the tree correctly when only the name filter is active', () => {
	const tree = buildTree({ locations, assets });

	//By location name
	let filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: 'machinery', energySensor: false, alertState: false, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].children.length).toBe(2);
	expect(buildTree({ locations, assets })[0].children.find(node => node.id === '656734968eb037001e474d5a')?.children.length).toBe(1);


	//By asset name
	filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: 'motors', energySensor: false, alertState: false, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(1);
	expect(filteredNodes[0].children[0].name).toBe('Motors H12D');
	expect(filteredNodes[0].children[0].children.length).toBe(1);

	//By component name
	filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: 'stage 1', energySensor: false, alertState: false, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(1);
	expect(filteredNodes[0].children[0].name).toBe('Motors H12D');
	expect(filteredNodes[0].children[0].children.length).toBe(1);
});


test('Filter tree - It should filter the tree correctly when only the energy sensor filter is active', () => {
	const tree = buildTree({ locations, assets });

	const filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: '', energySensor: true, alertState: false, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(1);
	expect(filteredNodes[0].children[0].name).toBe('Fan');
});

test('Filter tree - It should filter the tree correctly when only the alert state filter is active', () => {
	const tree = buildTree({ locations, assets });

	const filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: '', energySensor: false, alertState: true, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(2);
	expect(buildTree({ locations, assets })[0].children.find(node => node.id === '656734968eb037001e474d5a')?.children.length).toBe(1);
});

test('Filter tree - It should filter the tree correctly when both the energy sensor filter and the alert state filter are active', () => {
	const tree = buildTree({ locations, assets });

	const filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: '', energySensor: true, alertState: true, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(1);
	expect(filteredNodes[0].children[0].name).toBe('Fan');
});

test('Filter tree - It should filter the tree correctly when name, energy sensor and alert state filters are active', () => {
	const tree = buildTree({ locations, assets });

	//By location name
	let filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: 'machinery', energySensor: true, alertState: true, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(1);
	expect(filteredNodes[0].children[0].name).toBe('Fan');

	//By asset name
	filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: 'motors', energySensor: true, alertState: true, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(0);

	//By component name
	filteredNodes = removeNullChildren(tree.map(node => filterNode(node, { query: 'fan', energySensor: true, alertState: true, collapsedIds: [] })));
	expect(filteredNodes.length).toBe(1);
	expect(filteredNodes[0].name).toBe('Machinery house');
	expect(filteredNodes[0].children.length).toBe(1);
	expect(filteredNodes[0].children[0].name).toBe('Fan');
});

test('Flatten tree - It should correctly transform the tree into a list', () => {

	const tree = buildTree({ locations, assets });
	const flattenedList: ITreeNode[] = [];

	for (const node of tree) {
		flattenTree(node, flattenedList, { query: '', energySensor: false, alertState: false, collapsedIds: [] });
	}

	expect(flattenedList.length).toBe(4);
	expect(flattenedList[0].name).toBe('Machinery house');
	expect(flattenedList[flattenedList.findIndex(node => node.id === '656734968eb037001e474d5a') + 1].name).toBe('Motor H12D- Stage 1');
});


test('Flatten tree - It should correctly hide the children of collapsed nodes', () => {
	const tree = buildTree({ locations, assets });
	const flattenedList: ITreeNode[] = [];

	for (const node of tree) {
		flattenTree(node, flattenedList, { query: '', energySensor: false, alertState: false, collapsedIds: ['656734968eb037001e474d5a'] });
	}

	expect(flattenedList.length).toBe(3);
	expect(flattenedList[0].name).toBe('Machinery house');
	expect(flattenedList.find(node => node.id === '656734968eb037001e474d5a')).toBeDefined();
	expect(flattenedList.find(node => node.name === 'Fan')).toBeDefined();
});