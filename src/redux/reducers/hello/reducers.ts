import { HelloAction, HelloState, HELLO_TYPE } from './types';

const initialState: HelloState = {
  text: '',
};

export const hello = (state = initialState, action: HelloAction): HelloState => {
  if (action.type === HELLO_TYPE) return action.payload;
  return state;
};
