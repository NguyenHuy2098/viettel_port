import url from 'url';
import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client';
import routesMap from './routesMap';

import { REACT_APP_SSO_URL, REACT_APP_SSO_CLIENT_ID, REACT_APP_SSO_CLIENT_SECRET } from './env';

/* eslint-disable @typescript-eslint/camelcase */
const userManager = createUserManager({
  authority: REACT_APP_SSO_URL,
  automaticSilentRenew: true,
  client_id: REACT_APP_SSO_CLIENT_ID,
  client_secret: REACT_APP_SSO_CLIENT_SECRET,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: false,
  post_logout_redirect_uri: url.resolve(window.location.href, routesMap.logoutCallback),
  prompt: 'login',
  redirect_uri: url.resolve(window.location.href, routesMap.loginCallback),
  response_type: 'id_token token',
  scope: 'openid profile public-api sso-api se-public-api',
  silent_redirect_uri: url.resolve(window.location.href, routesMap.silentCallback),
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});
/* eslint-enable @typescript-eslint/camelcase */

console.log(userManager);

export default userManager;
