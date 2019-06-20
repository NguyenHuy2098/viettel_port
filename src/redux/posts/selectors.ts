import { createSelector } from 'reselect';
import { AppStateType } from 'redux/store';
import { PostState, Posts } from './types';

export const selectPosts = (state: AppStateType): PostState => state.posts;

export const makeSelectPostList = createSelector(
  selectPosts,
  (posts: PostState): Posts => posts.list,
);
