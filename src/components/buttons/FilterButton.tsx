import { IconProps } from "@tabler/icons-react";
import { ReactElement } from "react";

export default function FilterButton({ icon, label, active, onClick }: { icon: ReactElement<IconProps>, label: string, active: boolean, onClick: () => void }) {
	return (
		<button className={`border rounded py-[6px] px-3 flex items-center gap-[6px] ${active ? 'bg-button-company-active border-transparent' : 'bg-white border-border'}`} onClick={() => { onClick?.() }}>
			{icon}
			<span className={`whitespace-nowrap font-medium ${active ? 'text-white' : 'text-secondary'}`}>{label}</span>
		</button>
	)
}