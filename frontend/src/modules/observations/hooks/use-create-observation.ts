import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/common/models";
import { queryClient } from "@/common/services";
import { CreateObservation } from "@/observations/services";
import { CreateObservationRequest } from "@/observations/models";

export function useCreateObservation() {
    const mutation = useMutation({
        mutationFn: async (observation: CreateObservationRequest) => CreateObservation(observation),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Observations] }),
    });

    return { mutation };
}
