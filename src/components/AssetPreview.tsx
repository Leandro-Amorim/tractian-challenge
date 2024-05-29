import { useRecoilValue } from "recoil"
import { selectedState } from "../lib/atoms"
import { useEffect, useMemo, useState } from "react";
import { IconAccessPoint, IconBolt, IconPointFilled, IconRouter } from "@tabler/icons-react";
import { randomItem } from "../lib/utils";

export default function AssetPreview() {

	const selectedNode = useRecoilValue(selectedState);

	const [mockData, setMockData] = useState({
		image: '',
		equipmentType: '',
		sectorInCharge: '',
	});

	const icon = useMemo(() => {
		if (selectedNode === null) {
			return null;
		}
		return selectedNode.status === 'alert' ? <IconPointFilled size={18} className="text-red-500 mt-[2px]" /> :
			(
				selectedNode.sensorType === 'energy' ? <IconBolt className="text-green-500" size={18} /> : <IconPointFilled size={18} className="text-green-500 mt-[2px]" />
			)
	}, [selectedNode]);

	useEffect(() => {
		if (selectedNode === null) {
			return;
		}
		setMockData({
			image: randomItem(['./asset1.jpg', './asset2.jpg']),
			equipmentType: randomItem(['Electric Motor (three-phase)', 'Electric Motor (two-phase)']),
			sectorInCharge: randomItem(['Electrical', 'Mechanical']),
		});
	}, [selectedNode]);

	return (
		<div className="flex flex-col flex-auto lg:basis-0 lg:grow-[7] min-w-0 border border-border rounded">
			{
				selectedNode === null ? null :
					<div className="flex flex-col">

						<div className="flex gap-1 items-center pl-4 h-16 border-b border-border">
							<span className="text-xl font-semibold line-clamp-1">{selectedNode.name}</span>
							{icon}
						</div>

						<div className="py-8 mx-8 flex flex-col md:flex-row gap-0 md:gap-8 border-b border-border">

							<div className="flex-1">
								<img src={mockData.image} alt="Asset image" className="w-full h-full object-cover rounded" />
							</div>

							<div className="flex-1">

								<div className="flex flex-col gap-2 py-8">
									<span className="text-xl font-semibold line-clamp-1">Equipment Type</span>
									<span className="text-lg text-secondary line-clamp-1">{mockData.equipmentType}</span>
								</div>

								<div className="flex flex-col gap-2 border-t border-border pt-6">
									<span className="text-xl font-semibold line-clamp-1">Sector in Charge</span>
									<div className="flex gap-2 items-center">
										<div className="size-7 shrink-0 rounded-full bg-button-company-active text-white flex items-center justify-center">
											{
												mockData.sectorInCharge.charAt(0)?.toUpperCase()
											}
										</div>
										<span className="text-lg text-secondary line-clamp-1">{mockData.sectorInCharge}</span>
									</div>
								</div>

							</div>

						</div>

						<div className="p-8 flex gap-8 flex-col sm:flex-row">

							<div className="flex-1 flex flex-col gap-2">
								<span className="text-xl font-semibold line-clamp-1">Sensor</span>
								{
									selectedNode.sensorId &&
									<div className="flex gap-2 items-center">
										<IconAccessPoint className="text-button-company-active shrink-0" size={22} />
										<span className="text-lg text-secondary line-clamp-1">{selectedNode.sensorId}</span>
									</div>
								}
							</div>

							<div className="flex-1 flex flex-col gap-2">
								<span className="text-xl font-semibold line-clamp-1">Receiver</span>
								{
									selectedNode.gatewayId &&
									<div className="flex gap-2 items-center">
										<IconRouter className="text-button-company-active shrink-0" size={22} />
										<span className="text-lg text-secondary line-clamp-1">{selectedNode.gatewayId}</span>
									</div>
								}
							</div>

						</div>
					</div>
			}
		</div>
	)
}