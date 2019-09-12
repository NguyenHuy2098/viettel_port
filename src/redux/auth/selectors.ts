import { UserState } from 'redux-oidc';
import { User } from 'oidc-client';
import { get } from 'lodash';
import { AppStateType } from 'redux/store';

export const selectAuth = (state: AppStateType): UserState => state.auth;

export const makeSelectorUser = (state: AppStateType): User | undefined => get(selectAuth(state), 'user');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeSelectorProfile = (state: AppStateType): any => get(makeSelectorUser(state), 'profile');
