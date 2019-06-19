import { createSelector } from 'reselect';
import { AppStateType } from 'redux/store';
import { AuthStateType, UserType } from './types';

export const selectAuth = (state: AppStateType): AuthStateType => state.auth;

export const makeSelectUser = createSelector(
  selectAuth,
  (auth: AuthStateType): UserType | null => auth.user,
);
