import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useAuth } from "@/common/hooks";
import { IObservation } from "@/observations/models";
import { GetObservations } from "@/observations/services";
import { IServiceResponse, QueryKeys } from "@/common/models";

export function useObservations(patientId?: string) {
	const { user } = useAuth();
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: [QueryKeys.Observations, patientId],
		queryFn: () => GetObservations(patientId),
		staleTime: 1000 * 60 * 5, // 5 minutes
		// enabled: !!user,
	}) as UseQueryResult<IServiceResponse<IObservation[]>>;

	return { data, isLoading, isFetching, error, refetch };
}
