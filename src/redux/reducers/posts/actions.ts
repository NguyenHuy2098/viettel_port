import { createAction } from 'redux-unfold-saga';

export const GET_POSTS = 'GET_POSTS';

export const getPosts = createAction(GET_POSTS);
