import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useAuth } from "@/common/hooks";
import { GetPatients } from "@/patients/services";
import { ISummarizedPatient } from "@/patients/models";
import { IServiceResponse, QueryKeys } from "@/common/models";

export function usePatients(name?: string, includeReferences?: boolean) {
	const { user } = useAuth();
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: [QueryKeys.Patients, name, includeReferences],
		queryFn: () => GetPatients(name, includeReferences),
		staleTime: 1000 * 60 * 3, // 3 minutes
		// enabled: !!user,
	}) as UseQueryResult<IServiceResponse<ISummarizedPatient[]>>;

	return { data, isLoading, isFetching, error, refetch };
}
