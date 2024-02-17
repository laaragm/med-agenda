import { AccountInfo } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { graphLoginRequest, msalInstance, servicesConfig } from "@/authentication";
import { useAuth } from "./use-auth";
import { GraphService } from "../services";
import { EndpointBuilder, QueryKeys } from "../models";

export function useProfilePicture(userId?: string) {
    const { user } = useAuth();
    const { accounts } = useMsal();
    const currentAccount = useAccount(accounts[0] || {});
    const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: [QueryKeys.ProfilePicture, userId],
		queryFn: () => GetAvatarImage(currentAccount, userId),
		staleTime: 1000 * 60 * 5, // 5 minutes
		enabled: !!user && !!currentAccount,
	}) as UseQueryResult<string, unknown>;

    return { data, isLoading, isFetching, error, refetch };
}

async function GetAvatarImage(currentAccount: AccountInfo | null, userId?: string) {
    let blobUrl = "";
    if (currentAccount) {
        const endpointBuilder = new EndpointBuilder(servicesConfig.graphBaseUrl);
        const endpoint = !!userId
            ? endpointBuilder.build(servicesConfig.graphUserAvatarEndpoint, { id: userId })
            : endpointBuilder.build(servicesConfig.graphCurrentUserAvatarEndpoint);
        const authResult = await msalInstance.acquireTokenSilent({
            ...graphLoginRequest,
            account: currentAccount,
        });
        console.log("authResult", authResult);
        const responseBlob = await GraphService(endpoint, authResult.accessToken);
        if (!!responseBlob) {
            blobUrl = URL.createObjectURL(responseBlob);
        }
    }

    return blobUrl;
}
