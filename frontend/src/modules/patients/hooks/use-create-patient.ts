import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/common/models";
import { queryClient } from "@/common/services";
import { CreatePatient } from "@/patients/services";
import { CreatePatientRequest } from "@/patients/models";

export function useCreatePatient() {
    const mutation = useMutation({
        mutationFn: async (patient: CreatePatientRequest) => CreatePatient(patient),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Patients] }),
    });

    return { mutation };
}
