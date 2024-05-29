import { IconBolt, IconChevronDown, IconCube, IconMapPin, IconPackages, IconPointFilled } from "@tabler/icons-react";
import { IComponentNode, ITreeNode } from "../types/TreeNodes";
import { CSSProperties, memo, useMemo } from "react";
import { areEqual } from "react-window";

interface TreeNodeProps {
	node: ITreeNode,
	style?: CSSProperties,
	collapsed: boolean,
	onCollapse: (node: ITreeNode, collapsed: boolean) => void,
	selected: boolean,
	onSelect: (node: IComponentNode) => void
}

function TreeNode({ node, style, collapsed, onCollapse, selected, onSelect }: TreeNodeProps) {

	const icon = useMemo(() => {
		switch (node.type) {
			case 'location':
				return <IconMapPin className={`shrink-0 ${selected ? 'text-white' : 'text-button-company-active'}`} />
			case 'asset':
				return <IconCube className={`shrink-0 ${selected ? 'text-white' : 'text-button-company-active'}`} />
			case 'component':
				return <IconPackages className={`shrink-0 ${selected ? 'text-white' : 'text-button-company-active'}`} />
		}
	}, [node.type, selected])

	const componentStyle = { ...style };
	componentStyle.paddingLeft = `${node.level * 20}px`;

	return (
		<div style={componentStyle} onClick={() => node.type === 'component' ? onSelect(node) : null}>
			<div className={`p-2 flex gap-1 items-center ${selected ? 'bg-button-company-active' : ''} ${node.type === 'component' ? 'cursor-pointer' : ''}`}>
				<IconChevronDown onClick={() => onCollapse(node, collapsed)} size={16} className={`${node.hasChildren ? 'opacity-100 cursor-pointer' : 'opacity-0'} ${collapsed ? '-rotate-90' : 'rotate-0'}`} />
				{icon}
				<span className={`line-clamp-1 ${selected ? 'text-white' : ''}`}>
					{node.name}
				</span>
				{
					node.type === 'component' &&
					(
						node.status === 'alert' ? <IconPointFilled size={18} className="text-red-500" /> :
							(
								node.sensorType === 'energy' ? <IconBolt className="text-green-500" size={18} /> : <IconPointFilled size={18} className="text-green-500" />
							)

					)
				}
			</div>
		</div>
	)
}

const TreeNodeMemo = memo(TreeNode, areEqual);
export default TreeNodeMemo;