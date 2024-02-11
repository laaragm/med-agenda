import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/common/models";
import { queryClient } from "@/common/services";
import { DeletePatient } from "@/patients/services";

export function useDeletePatient() {
    const mutation = useMutation({
        mutationFn: async (id: string) => DeletePatient(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Patients] }),
    });

    return { mutation };
}
