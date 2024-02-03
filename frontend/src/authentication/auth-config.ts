import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.NEXT_PUBLIC_MSAL_CLIENT_APP_ID || '',
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
  scopes: ["User.Read"],
};

export const apiTokenRequest = {
  scopes: [`api://${import.meta.env.VITE_MSAL_CLIENT_ID}/user_impersonation`],
};

export const servicesConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphAvatarEndpoint: 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value'
};
