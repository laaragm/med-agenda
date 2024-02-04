import { useEffect, useState } from "react";

import { useStore } from "@/store";
import { usePatients } from "@/patients/hooks";
import { showErrorMessage } from "@/common/utils";

export function usePatientSearch() {
	const [filters, setFilters] = useState({ name: "", includeReferences: false });
	const { data, isLoading, error } = usePatients(filters.name, filters.includeReferences);
	const { setPatients, setIsLoading } = useStore();

	useEffect(() => {
        console.log("data: ", data);
        setIsLoading(isLoading);
        if (error) {
			showErrorMessage("Ocorreu um erro ao buscar os pacientes");
            console.error(error);
        }
        if (data?.result) {
            setPatients(data.result);
        }
    }, [data, isLoading, error]);

	const onChangeIncludeReferences = (checked: boolean) => {
		setFilters(prevState => ({ ...prevState, includeReferences: checked }));
	}

	const onSearch = async (name: string) => {
        if (name.length === 0) {
			showErrorMessage("Digite um nome para pesquisar");
            return;
        }
		setFilters(prevState => ({ ...prevState, name }));
    }

	const onClear = () => {
        setFilters({ name: "", includeReferences: false });
    }

	return { filters, onChangeIncludeReferences, onSearch, onClear };
}
