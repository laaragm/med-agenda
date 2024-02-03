import { Checkbox, SearchBar } from "@/common/components";

type PatientSearchProps = {
	value: string;
	includeReferences: boolean;
	onSearch: (value: string) => void;
	onChangeIncludeReferences: (value: boolean) => void;
}

export function PatientSearch({ value, includeReferences, onSearch, onChangeIncludeReferences }: PatientSearchProps) {
	return (
		<div className="flex flex-col gap-2">
			<SearchBar value={value} placeholder="Buscar paciente" onSearch={onSearch} />
			<Checkbox
				id="patient-include-references-checkbox"
				checked={includeReferences}
				label="Incluir referências"
				className="ml-1"
				onChange={({ target }) => onChangeIncludeReferences(target.checked)}
			/>
		</div>
	);
}
