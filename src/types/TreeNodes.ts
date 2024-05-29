export type NodeType = 'location' | 'asset' | 'component';

interface IBasicNode {
	id: string,
	name: string,
	level: number,
	parentId: string | null,
	hasChildren: boolean,
	children: ITreeNode[],
	type: NodeType
}

export interface ILocationNode extends IBasicNode {
	type: 'location',
}

export interface IAssetNode extends IBasicNode {
	type: 'asset',
}

export interface IComponentNode extends IBasicNode {
	type: 'component',
	
	sensorId: string,
	sensorType: 'energy' | 'vibration',
	status: 'operating' | 'alert',
	gatewayId: string,
}

export type ITreeNode = ILocationNode | IAssetNode | IComponentNode;