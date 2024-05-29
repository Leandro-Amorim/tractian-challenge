import { atom } from "recoil";
import { ISearch } from "../types/General";
import { IComponentNode } from "../types/TreeNodes";

export const selectedCompanyState = atom({
	key: 'selectedCompanyState', default: {
		id: '',
		name: '',
	}
})

export const searchState = atom({
	key: 'searchState', default: {
		query: '',
		energySensor: false as boolean,
		alertState: false as boolean,
		collapsedIds: [] as string[],
	} satisfies ISearch
})

export const selectedState = atom({
	key: 'selectedState', default: null as IComponentNode | null
})