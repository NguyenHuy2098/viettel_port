import { ACTION_TYPE_HELLO } from './actionTypes';

export const actionHello = () => {
  return {
    type: ACTION_TYPE_HELLO,
    payload: 'Hello Redux !!!',
  };
};
