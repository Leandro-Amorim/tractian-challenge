import { IconStack } from '@tabler/icons-react';

export default function CompanyButton({ name, selected, onClick }: { name: string, selected: boolean, onClick: () => void }) {
	return (
		<button className={`rounded-sm text-white py-1 px-3 flex items-center gap-2 font-semibold ${selected ? 'bg-button-company-active' : 'bg-button-company'}`} onClick={() => onClick?.()}>
			<IconStack />
			<span className="whitespace-nowrap text-sm">{`${name} Unit`}</span>
		</button>
	)
}