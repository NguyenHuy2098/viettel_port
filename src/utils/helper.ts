import { forEach } from 'lodash';

export const checkChildsLifeCycle = (row: API.RowMTZTMI047OUT): boolean => {
  forEach(row.Childs, child => {
    if (child.LIFECYCLE !== '109') {
      return true;
    }
  });
  return false;
};
