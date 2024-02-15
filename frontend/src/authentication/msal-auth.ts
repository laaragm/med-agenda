import { AccountInfo, AuthenticationResult, EventType, PublicClientApplication } from '@azure/msal-browser';

import { removeFromStorage } from '@/common/utils';
import { AuthTokenError, TOKEN_KEY } from '@/common/models';
import { msalConfig } from './auth-config';

export const signIn = async () => {
	const accounts = msalInstance.getAllAccounts();
	if (accounts.length > 0) {
		msalInstance.setActiveAccount(accounts[0]);
	}

	msalInstance.addEventCallback((event) => {
		const eventPayload = event.payload;
		const account: AccountInfo | null = eventPayload != null && 'account' in eventPayload ? (eventPayload.account as AccountInfo) : null;
		if (event.eventType === EventType.LOGIN_SUCCESS && !!account) {
			msalInstance.setActiveAccount(account);
		}
	});

	msalInstance
		.handleRedirectPromise()
		.then(() => {
			const account = msalInstance.getActiveAccount();
			if (!account) {
				msalInstance.loginRedirect();
			}
		})
		.catch((error) => {
			console.error(error);
		});
};

export const signOut = async () => {
	const tokenKeys = Object.keys(TOKEN_KEY);
	for (const key of tokenKeys) {
		removeFromStorage(key);
	}
	await msalInstance.logoutRedirect().catch((error) => {
		console.error(error);
	});
};

export const acquireToken = async (scopes: string[]): Promise<AuthenticationResult> => {
	const activeAccount = msalInstance.getActiveAccount();
	const accounts = msalInstance.getAllAccounts();
	const request = { scopes, account: accounts[0] };

	if (!activeAccount && accounts.length === 0) {
		throw new AuthTokenError();
	}

	const authResult = await msalInstance.acquireTokenSilent(request);

	return authResult;
};

export const msalInstance = new PublicClientApplication(msalConfig);
