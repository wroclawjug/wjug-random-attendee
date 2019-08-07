import { AuthConfig } from 'angular-oauth2-oidc';

// HACK
let baseHref = '/wroclawjug-random-attendee';

export const authConfig: AuthConfig = {
  loginUrl: 'https://secure.meetup.com/oauth2/authorize',
  redirectUri: `${window.location.origin}${baseHref}/index.html`,
  clientId: 'nhlu5b6dvqkfvt9guc2nr0pdrn',
  scope: 'basic',
  oidc: false,
};
