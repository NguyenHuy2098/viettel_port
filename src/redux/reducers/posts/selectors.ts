import { createSelector } from 'reselect';
import { AppState } from 'redux/store';
import { PostState } from './types';

export const selectPosts = (state: AppState) => state.posts;

export const makeSelectPostList = createSelector(
  selectPosts,
  (posts: PostState) => posts.list,
);
