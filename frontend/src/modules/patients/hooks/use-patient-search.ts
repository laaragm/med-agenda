import { useEffect, useState } from "react";

import { useStore } from "@/store";
import { usePatients } from "@/patients/hooks";
import { showErrorMessage } from "@/common/utils";

export function usePatientSearch() {
	const [filters, setFilters] = useState({ name: "", includeReferences: false });
	const { data, isLoading, error } = usePatients(filters.name, filters.includeReferences);
	const { setPatients, setIsLoading } = useStore();

	useEffect(() => {
        setIsLoading(isLoading);
        if (error) {
			showErrorMessage("Ocorreu um erro ao buscar os pacientes");
            console.error(error);
        }
        if (data?.result) {
            setPatients(data.result);
        }
    }, [data, isLoading, error]);

	const onSearch = async (name: string, includeReferences: boolean) => {
        if (name.length === 0) {
			showErrorMessage("Digite um nome para pesquisar");
            return;
        }
		setFilters(prevState => ({ ...prevState, name, includeReferences }));
    }

	const onClear = () => {
		setFilters(prevState => ({ ...prevState, name: "" }));
    }

	return { filters, onSearch, onClear };
}
