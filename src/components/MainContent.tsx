import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { searchState, selectedCompanyState, selectedState } from "../lib/atoms"
import fetchAPI from "../lib/fetchAPI"
import { APIAsset, APILocation } from "../types/API"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import buildTree from "../lib/buildTree";
import FilterButton from "./buttons/FilterButton";
import { IconAlertCircle, IconBolt } from "@tabler/icons-react";
import TreeViewer from "./TreeViewer";
import AssetPreview from "./AssetPreview";
import filterAndFlattenTree from "../lib/filterAndFlattenTree";

export default function MainContent() {

	const selectedCompany = useRecoilValue(selectedCompanyState);

	const [search, setSearch] = useRecoilState(searchState);
	const setSelected = useSetRecoilState(selectedState);

	useEffect(() => {
		setSelected(null);
		setSearch((prev) => ({ ...prev, collapsedIds: [] }));
	}, [selectedCompany.id, setSelected, setSearch]);

	const { data: locations, isError: locationError, isLoading: locationLoading, isSuccess: locationSuccess } = useQuery({
		queryKey: ['locations', selectedCompany.id],
		queryFn: () => { return fetchAPI<APILocation[]>(`/companies/${selectedCompany.id}/locations`) },
		enabled: selectedCompany.id !== '',
	});

	const { data: assets, isError: assetsError, isLoading: assetsLoading, isSuccess: assetsSuccess } = useQuery({
		queryKey: ['assets', selectedCompany.id],
		queryFn: () => { return fetchAPI<APIAsset[]>(`/companies/${selectedCompany.id}/assets`) },
		enabled: selectedCompany.id !== '',
	});

	const list = useMemo(() => {
		if (locationSuccess && assetsSuccess) {
			return filterAndFlattenTree(buildTree({ locations, assets }), search);
		}
		return [];
	}, [locations, assets, locationSuccess, assetsSuccess, search]);

	const isError = locationError || assetsError;
	const isLoading = locationLoading || assetsLoading;

	return (
		<main className="grow bg-white m-[10px] rounded-lg border border-border p-4 flex flex-col">

			<div className="flex justify-between">

				<div className="hidden sm:flex sm:gap-2 sm:items-end">
					<span className="text-title font-bold text-2xl">Assets</span>
					{
						selectedCompany.id && <span className="text-secondary text-lg line-clamp-1">{`/ ${selectedCompany.name} Unit`}</span>
					}
				</div>

				<div className="flex items-center gap-2 justify-end grow">
					<FilterButton icon={<IconBolt size={20} className={search.energySensor ? 'text-white' : 'text-button-company-active'} />} label={'Energy Sensor'} active={search.energySensor} onClick={() => setSearch((prev) => ({ ...prev, energySensor: !prev.energySensor }))} />
					<FilterButton icon={<IconAlertCircle size={20} className={search.alertState ? 'text-white' : 'text-button-company-active'} />} label={'Alert'} active={search.alertState} onClick={() => setSearch((prev) => ({ ...prev, alertState: !prev.alertState }))} />
				</div>

			</div>

			<div className="mt-3 flex gap-4 lg:gap-2 grow flex-col lg:flex-row">
				<TreeViewer list={list} isError={isError} isLoading={isLoading} />
				<AssetPreview />
			</div>

		</main>
	)
}