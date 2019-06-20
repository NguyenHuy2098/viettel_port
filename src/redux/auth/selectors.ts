import { UserState } from 'redux-oidc';
import { User } from 'oidc-client';
import { createSelector } from 'reselect';
import { AppStateType } from 'redux/store';

export const selectAuth = (state: AppStateType): UserState => state.auth;

export const makeSelectUser = createSelector(
  selectAuth,
  (auth: UserState): User | undefined => auth.user,
);

export const makeSelectProfile = createSelector(
  makeSelectUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (user: User | undefined): any => (user ? user.profile : undefined),
);
