import { APIAsset, APILocation } from "../types/API";
import { IAssetNode, IComponentNode, ILocationNode, ITreeNode } from "../types/TreeNodes";

export default function buildTree({ locations, assets }: { locations: APILocation[], assets: APIAsset[] }) {

	const result: ITreeNode[] = [];
	const nodeMap: Record<string, ITreeNode> = {};

	for (const location of locations) {
		nodeMap[location.id] = {
			id: location.id,
			name: location.name,
			type: 'location',
			parentId: location.parentId ?? null,
			hasChildren: false,
			children: [],
			level: 0
		} satisfies ILocationNode;
	}

	for (const asset of assets) {

		if (asset.sensorType) {
			nodeMap[asset.id] = {
				id: asset.id,
				name: asset.name,
				type: 'component',
				sensorId: asset.sensorId,
				sensorType: asset.sensorType,
				status: asset.status,
				gatewayId: asset.gatewayId,
				parentId: asset.parentId ?? asset.locationId ?? null,
				hasChildren: false,
				children: [],
				level: 0
			} satisfies IComponentNode;
		}
		else {
			nodeMap[asset.id] = {
				id: asset.id,
				name: asset.name,
				type: 'asset',
				parentId: asset.parentId ?? asset.locationId ?? null,
				hasChildren: false,
				children: [],
				level: 0
			} satisfies IAssetNode;
		}
	}

	for (const id of Object.keys(nodeMap)) {

		const node = nodeMap[id];
		const parentId = node.parentId;
		
		if (parentId) {
			nodeMap[parentId].children.push(node);
			nodeMap[parentId].hasChildren = true;
		}
		else {
			result.push(node);
		}
	}

	for (const node of result) {
		setLevel(node, 0);
	}

	return result;
}

function setLevel(node: ITreeNode, level: number) {
	node.level = level;
	for (const child of node.children) {
		setLevel(child, level + 1);
	}
}