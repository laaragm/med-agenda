import { useState } from "react";

import { showErrorMessage } from "@/common/utils";
import { GetPatients } from "@/patients/services";

export function usePatientSearch() {
	const [includeReferences, setIncludeReferences] = useState(false);

	const onChangeIncludeReferences = (checked: boolean) => {
		setIncludeReferences(checked);
	}

	const onSearch = async (name: string) => {
		console.log('Searching for:', name);
		if (name.length === 0) {
			showErrorMessage("Digite um nome para pesquisar");
			return;
		}

		const response = await GetPatients(name, includeReferences);
		console.log('Response:', response);
	}

	const onClear = () => {
		console.log('Clearing search');
	}

	return { includeReferences, onChangeIncludeReferences, onSearch, onClear };
}
