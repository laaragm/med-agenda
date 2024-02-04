import { Checkbox, SearchBar } from "@/common/components";

type PatientSearchProps = {
	defaultValue?: string;
	includeReferences: boolean;
	onSearch: (value: string) => void;
	onClear: () => void;
	onChangeIncludeReferences: (value: boolean) => void;
}

export function PatientSearch({ defaultValue, includeReferences, onSearch, onClear, onChangeIncludeReferences }: PatientSearchProps) {
	return (
		<div className="flex flex-col gap-2">
			<SearchBar defaultValue={defaultValue} placeholder="Buscar paciente" onSearch={onSearch} onClear={onClear} />
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
