import { ISearch } from "../types/General";
import { ITreeNode } from "../types/TreeNodes";
import { isCollapsed } from "./utils";

export default function filterAndFlattenTree(tree: ITreeNode[], query: ISearch) {

	const filteredNodes = tree.map(node => filterNode(node, query));
	const flattenedList: ITreeNode[] = [];

	for (const node of filteredNodes) {
		flattenTree(node, flattenedList, query);
	}
	return flattenedList;
}

export function filterNode(node: ITreeNode, query: ISearch, fatherShowing: boolean = false) {

	const nameCheck = fatherShowing || node.name.toLowerCase().includes(query.query.toLowerCase());

	let passing = nameCheck;

	if (query.energySensor) {
		passing = passing && (node.type === 'component' && node.sensorType === 'energy');
	}

	if (query.alertState) {
		passing = passing && (node.type === 'component' && node.status === 'alert');
	}

	if (passing) {
		return node;
	}
	else {
		const filteredChildren = node.children.map(child => filterNode(child, query, nameCheck)).filter(child => child !== null) as ITreeNode[];

		if (filteredChildren.length > 0) {
			return { ...node, children: filteredChildren };
		}
	}
	return null;
}

export function flattenTree(node: ITreeNode | null, result: ITreeNode[], query: ISearch): void {
	if (node) {
		result.push({ ...node });
		if (isCollapsed(node, query)) return;
		for (const child of node.children) {
			flattenTree(child, result, query);
		}
	}
}