import { useMutation } from "@tanstack/react-query";

import { QueryKeys } from "@/common/models";
import { queryClient } from "@/common/services";
import { DeleteObservation } from "@/observations/services";

export function useDeleteObservation() {
    const mutation = useMutation({
        mutationFn: async (id: string) => DeleteObservation(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Observations] }),
    });

    return { mutation };
}
