import { ISearch } from "../types/General";
import { ITreeNode } from "../types/TreeNodes";

export function randomItem <T>(list: T[]) {
	return list[Math.floor(Math.random() * list.length)]
}

export function isCollapsed(node: ITreeNode, query: ISearch) {
	return query.collapsedIds.includes(node.id);
}