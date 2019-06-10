import { HELLO_TYPE, HelloAction } from './types';

export function actionHello(): HelloAction {
  return {
    type: HELLO_TYPE,
    payload: { text: 'Hello redux' },
  };
}
