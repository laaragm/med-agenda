import { createContext, ReactNode, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

import { acquireToken, adxLoginRequest } from "@/authentication";
import { IUser } from "../models";
import { useAdxApiConfig, useAdxOpenAiApiConfig } from "../hooks";

type AuthContextData = {
    isAuthenticated: boolean;
    user: IUser | null;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthContextProviderProps = {
    children: ReactNode;
};

type Token = {
    oid: string;
    email: string;
    name: string;
    given_name: string;
    family_name: string;
    roles: string[];
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const { accounts } = useMsal();
    const { onDefineAuthorizationHeader: defineAdxOpenAiAuthorizationHeader } = useAdxOpenAiApiConfig();
    const { onDefineAuthorizationHeader: defineAdxAuthorizationHeader } = useAdxApiConfig();
    const [user, setUser] = useState<IUser | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        saveInfoAfterSignIn();
        setupApiHeaders();
    }, [accounts]);

    const saveInfoAfterSignIn = async () => {
        if (accounts.length > 0) {
            const authResult = await acquireToken(adxLoginRequest.scopes);
            if (authResult && authResult.idTokenClaims) {
                defineUserInfo(authResult.idTokenClaims as Token);
            }
        }
    };

    const setupApiHeaders = async () => {
        await defineAdxAuthorizationHeader();
        await defineAdxOpenAiAuthorizationHeader();
    };

    const defineUserInfo = (idTokenClaims: Token) => {
        if (!!idTokenClaims) {
            setUser((prevState) => ({
                ...prevState,
                id: idTokenClaims.oid,
                email: idTokenClaims.email,
                fullName: idTokenClaims.name,
                givenName: idTokenClaims.given_name,
                familyName: idTokenClaims.family_name,
                roles: idTokenClaims?.roles,
            }));
        }
    };

    return <AuthContext.Provider value={{ isAuthenticated, user }}>{children}</AuthContext.Provider>;
}
