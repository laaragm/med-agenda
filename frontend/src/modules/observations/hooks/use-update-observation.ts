import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/common/models";
import { queryClient } from "@/common/services";
import { UpdateObservation } from "@/observations/services";
import { UpdateObservationRequest } from "@/observations/models";

export function useUpdateObservation() {
    const mutation = useMutation({
        mutationFn: async ({ patientId, body } : { patientId: string, body: UpdateObservationRequest}) => UpdateObservation(patientId, body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Observations] }),
    });

    return { mutation };
}
