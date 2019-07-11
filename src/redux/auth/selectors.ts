import { UserState } from 'redux-oidc';
import { User } from 'oidc-client';
import { get } from 'lodash';
import { AppStateType } from 'redux/store';

export const selectAuth = (state: AppStateType): UserState => state.auth;

export const makeSelectUser = (state: AppStateType): User | undefined => get(selectAuth(state), 'user');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeSelectProfile = (state: AppStateType): any => get(makeSelectUser(state), 'profile');
