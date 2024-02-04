import { useRef } from "react";

import { Checkbox, SearchBar } from "@/common/components";

type PatientSearchProps = {
	defaultValue?: string;
	onSearch: (name: string, includeReferences: boolean) => void;
	onClear: () => void;
}

export function PatientSearch({ defaultValue, onSearch, onClear }: PatientSearchProps) {
	const checkboxRef = useRef<HTMLInputElement>(null);

	const handleSearch = (name: string) => {
		onSearch(name, checkboxRef.current?.checked ?? false);
	}

	return (
		<div className="flex flex-col gap-2">
			<SearchBar defaultValue={defaultValue} placeholder="Buscar paciente" onSearch={handleSearch} onClear={onClear} />
			<Checkbox
				id="patient-include-references-checkbox"
				ref={checkboxRef}
				label="Incluir referências"
				className="ml-1"
			/>
		</div>
	);
}
