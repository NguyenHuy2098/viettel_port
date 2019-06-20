import { REACT_APP_SSO_CLIENT_ID, REACT_APP_SSO_URL } from './env';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadLoggedInUser = (): any => {
  try {
    const serializedState = localStorage.getItem(`oidc.user:${REACT_APP_SSO_URL}:${REACT_APP_SSO_CLIENT_ID}`);
    if (!serializedState) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveLoggedInUser = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`oidc.user:${REACT_APP_SSO_URL}:${REACT_APP_SSO_CLIENT_ID}`, serializedState);
  } catch {
    // ignore write errors
  }
};
