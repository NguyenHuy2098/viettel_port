import url from 'url';
import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client';

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
  post_logout_redirect_uri: url.resolve(window.location.href, '/signout-callback'),
  redirect_uri: url.resolve(window.location.href, '/signin-callback'),
  response_type: 'id_token token',
  scope: 'offline_access openid profile public-api',
  silent_redirect_uri: url.resolve(window.location.href, '/silent-callback'),
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});
/* eslint-enable @typescript-eslint/camelcase */

export default userManager;
