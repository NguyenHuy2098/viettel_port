export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Posts = Post[];

export interface PostState {
  list: Posts;
}
