import { IconLoader2, IconSearch, IconXboxX } from "@tabler/icons-react";
import { IComponentNode, ITreeNode } from "../types/TreeNodes";
import TreeNode from "./TreeNode";
import { useRecoilState } from "recoil";
import { searchState, selectedState } from "../lib/atoms";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { useCallback } from "react";
import { isCollapsed } from "../lib/utils";

export default function TreeViewer({ list, isError, isLoading }: { list: ITreeNode[], isError: boolean, isLoading: boolean }) {

	const [search, setSearch] = useRecoilState(searchState);
	const [selected, setSelected] = useRecoilState(selectedState);

	const onCollapse = useCallback((node: ITreeNode, collapsed: boolean) => {
		if (!node.hasChildren) return;

		if (collapsed) {
			setSearch((prev) => ({ ...prev, collapsedIds: prev.collapsedIds.filter(id => id !== node.id) }));
		}
		else {
			setSearch((prev) => ({ ...prev, collapsedIds: [...prev.collapsedIds, node.id] }));
		}
	}, [setSearch]);

	const onSelect = useCallback((node: IComponentNode) => {
		setSelected(node);
	}, [setSelected]);

	const toggleAllCollapsibles = useCallback((expand: boolean) => {
		let ids = [] as string[];
		if (expand) {
			ids = [];
		}
		else {
			ids = list.filter(node => node.hasChildren).map(node => node.id);
		}
		setSearch((prev) => ({ ...prev, collapsedIds: ids }));
	}, [setSearch, list]);

	return (
		<div className="flex flex-col grow-0 basis-[350px] lg:grow-[3] lg:basis-0 min-w-0 border border-border rounded">

			<div className="flex items-center border-b border-border">
				<input className="w-full p-3 outline-none" placeholder="Search Asset or Location" value={search.query} onChange={(e) => setSearch((prev) => ({ ...prev, query: e.target.value }))} />
				<div className={`h-full aspect-square flex items-center justify-center ${search.query ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => setSearch((prev) => ({ ...prev, query: '' }))}>
					{
						search.query ? <IconXboxX size={20} className="text-secondary"/> : <IconSearch size={16} />
					}
				</div>
			</div>

			<div className="flex items-center p-2 gap-2">
				<button className={`flex-1 border border-border rounded py-[6px] px-3 flex items-center justify-center`} onClick={() => { toggleAllCollapsibles(false) }}>
					<span className={`font-medium text-secondary`}>Collapse All</span>
				</button>
				<button className={`flex-1 border border-border rounded py-[6px] px-3 flex items-center justify-center`} onClick={() => { toggleAllCollapsibles(true) }}>
					<span className={`font-medium text-secondary`}>Expand All</span>
				</button>
			</div>

			<div className="flex-auto">
				{
					isLoading ?
						<div className="h-full flex items-center justify-center"><IconLoader2 size={30} className="animate-spin text-button-company-active" /></div> :
						isError ? <div className="h-full flex items-center justify-center text-red-500 font-semibold text-center px-2">There was an error with your request, please try again later.</div> :
							<AutoSizer>
								{({ height, width }) => {
									return (<List
										height={height}
										itemCount={list.length}
										itemSize={42}
										width={width}>
										{({ index, style }) => (
											<TreeNode key={list[index].id} node={list[index]} style={style} collapsed={isCollapsed(list[index], search)} onCollapse={onCollapse} selected={list[index].id === selected?.id} onSelect={onSelect} />
										)}
									</List>)
								}}
							</AutoSizer>
				}
			</div>
		</div>
	)
}