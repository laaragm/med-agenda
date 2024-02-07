import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/modules/common/models";
import { CreatePatient } from "@/patients/services";
import { queryClient } from "@/modules/common/services";
import { CreatePatientRequest } from "@/patients/models";

export function useCreatePatient() {
    const mutation = useMutation({
        mutationFn: async (patient: CreatePatientRequest) => CreatePatient(patient),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Patients] }),
    });

    return { mutation };
}
