export interface UserType {
  name: string;
}

export interface AuthStateType {
  user: UserType | null;
}
