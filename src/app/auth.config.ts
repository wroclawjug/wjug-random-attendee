import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  loginUrl: 'https://secure.meetup.com/oauth2/authorize',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'nhlu5b6dvqkfvt9guc2nr0pdrn',
  scope: 'basic',
  oidc: false,
};
