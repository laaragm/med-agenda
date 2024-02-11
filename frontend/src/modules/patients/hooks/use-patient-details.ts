import { useEffect, useState } from "react";

import { useStore } from "@/store";
import { usePatient } from "@/patients/hooks";
import { showErrorMessage } from "@/common/utils";

export function usePatientDetails() {
	const [id, setId] = useState("");
	const { data, isLoading, error } = usePatient(id);
	const { setCurrentPatient, setIsLoadingCurrentPatient } = useStore();

	useEffect(() => {
        setIsLoadingCurrentPatient(isLoading);
        if (error) {
			showErrorMessage("Ocorreu um erro ao buscar os detalhes do paciente");
            console.error(error);
        }
        if (data?.result) {
            setCurrentPatient(data.result);
        }
    }, [data, isLoading, error]);

	const onRequestDetails = (id: string) => {
		setId(id);
    }

	return { onRequestDetails };
}
