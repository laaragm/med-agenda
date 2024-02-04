import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useAuth } from "@/common/hooks";
import { IPatient } from "@/patients/models";
import { GetPatient } from "@/patients/services";
import { isStringNullOrEmpty } from "@/modules/common/utils";
import { IServiceResponse, QueryKeys } from "@/common/models";

export function usePatient(id: string) {
	const { user } = useAuth();
	const { data, isLoading, isFetching, error, refetch } = useQuery({
	  queryKey: [QueryKeys.Patients, id],
	  queryFn: () => GetPatient(id),
	  staleTime: 1000 * 60 * 3, // 3 minutes
	  enabled: !isStringNullOrEmpty(id), // !!user,
	}) as UseQueryResult<IServiceResponse<IPatient>>;

	return { data, isLoading, isFetching, error, refetch };
}
