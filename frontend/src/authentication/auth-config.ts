import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
	auth: {
		clientId: import.meta.env.VITE_MSAL_CLIENT_APP_ID || '',
		authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MSAL_TENANT_ID}`,
		redirectUri: '/',
		postLogoutRedirectUri: '/',
		navigateToLoginRequestUrl: false,
	},
	cache: {
		cacheLocation: 'sessionStorage',
	},
};

export const graphLoginRequest = {
  	scopes: ["User.Read profile openid"],
};

export const apiTokenRequest = {
  	scopes: [`api://${import.meta.env.VITE_MSAL_SERVER_APP_ID}/access_as_user`],
};

export const servicesConfig = {
	graphBaseUrl: "https://graph.microsoft.com/v1.0/",
    graphCurrentUserAvatarEndpoint: "me/photo/$value",
    graphUserAvatarEndpoint: "users/{id}/photo/$value"
};
