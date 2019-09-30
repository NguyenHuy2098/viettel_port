import store from 'redux/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function select<RT = any>(selector: Function): RT {
  const state = store.getState();
  return selector(state);
}
