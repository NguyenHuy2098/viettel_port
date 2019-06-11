export interface HelloState {
  text: string;
}

export const HELLO_TYPE = 'HELLO_TYPE';

export interface HelloAction {
  type: typeof HELLO_TYPE;
  payload: HelloState;
}
