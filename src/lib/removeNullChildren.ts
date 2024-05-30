import { ITreeNode } from "../types/TreeNodes";

export default function removeNullChildren(tree: (ITreeNode | null)[]): ITreeNode[] {

	const filteredTree = tree.filter(node => node !== null) as ITreeNode[];

	for (const node of filteredTree) {
		node.children = removeNullChildren(node.children);
	}
	return filteredTree;
}