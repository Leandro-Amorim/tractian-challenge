export interface APICompany {
	id: string,
	name: string
}

export interface APILocation {
	id: string,
	name: string,
	parentId?: string | null
}



interface APIPureAsset {
	id: string,
	name: string,
	parentId?: string | null,
	locationId?: string | null,

	sensorId?: null,
	sensorType?: null,
	status?: null,
	gatewayId?: null
}

interface APIComponent {
	id: string,
	name: string,
	parentId?: string | null,
	locationId?: string | null,

	sensorId: string,
	sensorType: 'energy' | 'vibration',
	status: 'operating' | 'alert',
	gatewayId: string
}


export type APIAsset = APIPureAsset | APIComponent;