import { useState } from "react";

export function usePatientSearch() {
	const [includeReferences, setIncludeReferences] = useState(false);

	const onChangeIncludeReferences = (checked: boolean) => {
		setIncludeReferences(checked);
	}

	const onSearch = (value: string) => {
		console.log('Searching for:', value);
		if (value.length === 0) return;
	}

	return { includeReferences, onChangeIncludeReferences, onSearch };
}
