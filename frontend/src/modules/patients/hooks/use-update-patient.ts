import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/common/models";
import { queryClient } from "@/common/services";
import { UpdatePatient } from "@/patients/services";
import { UpdatePatientRequest } from "@/patients/models";

export function useUpdatePatient() {
    const mutation = useMutation({
        mutationFn: async (patient: UpdatePatientRequest) => UpdatePatient(patient),
        onSuccess: () =>  queryClient.invalidateQueries({ queryKey: [QueryKeys.Patients] }),
    });

    return { mutation };
}
