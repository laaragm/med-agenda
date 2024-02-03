'use client';

import { createContext, ReactNode, useMemo } from 'react';
import { useAccount, useMsal } from '@azure/msal-react';

import { IUser } from '@/common/models';
import { isStringNullOrEmpty } from '@/common/utils';

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
	name: string;
	preferred_username: string;
	given_name: string;
	family_name: string;
	roles: string[];
};

const formatName = (idTokenClaims: Token): { name: string; surname: string } => {
	let { given_name: givenName, family_name: familyName } = idTokenClaims;

	if (isStringNullOrEmpty(givenName) || isStringNullOrEmpty(familyName)) {
		const [firstName, lastName] = idTokenClaims.name.split(' ');
		givenName = givenName || firstName || '';
		familyName = familyName || lastName || '';
	}

  return { name: givenName, surname: familyName };
};

const getUserInfo = (idTokenClaims: Token, name: string, surname: string): IUser => ({
	id: idTokenClaims.oid,
	email: idTokenClaims.preferred_username,
	fullName: idTokenClaims.name,
	givenName: name,
	familyName: surname,
	roles: idTokenClaims.roles,
});

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const { accounts } = useMsal();
	const currentAccount = useAccount(accounts[0] || {});
	const idTokenClaims = currentAccount?.idTokenClaims as Token | undefined;

	const user = useMemo(() => {
		if (!idTokenClaims) return null;
		const { name, surname } = formatName(idTokenClaims);
		return getUserInfo(idTokenClaims, name, surname);
	}, [idTokenClaims]);

	const isAuthenticated = !!user;

	return <AuthContext.Provider value={{ isAuthenticated, user }}>{children}</AuthContext.Provider>;
}
