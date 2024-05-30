import { APIAsset, APILocation } from "../types/API";

export const locations: APILocation[] = [
	{
		id: "656733b1664c41001e91d9ed",
		name: "Machinery house",
		parentId: null
	}
]

export const assets: APIAsset[] = [
	{
		id: "656734968eb037001e474d5a",
		locationId: "656733b1664c41001e91d9ed",
		name: "Motors H12D",
		parentId: null,
		sensorType: null,
		status: null
	},
	{
		id: "6567340c1f4664001f29622e",
		locationId: null,
		name: "Motor H12D- Stage 1",
		parentId: "656734968eb037001e474d5a",
		gatewayId: "QBK282",
		sensorId: "CFX848",
		sensorType: "vibration",
		status: "alert"
	},
	{
		gatewayId: "QHI640",
		id: "656734821f4664001f296973",
		locationId: "656733b1664c41001e91d9ed",
		name: "Fan",
		parentId: null,
		sensorId: "MTC052",
		sensorType: "energy",
		status: "alert"
	}
]