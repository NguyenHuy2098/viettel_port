import { createSelector } from 'reselect';
import { AppState } from 'redux/store';
import { PostState, Posts } from './types';

export const selectPosts = (state: AppState): PostState => state.posts;

export const makeSelectPostList = createSelector(
  selectPosts,
  (posts: PostState): Posts => posts.list,
);
