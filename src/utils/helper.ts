import { forEach } from 'lodash';

export const checkIsNot109LifeCycle = (row: API.RowMTZTMI047OUT): boolean => {
  forEach(row.Childs, child => {
    if (child.LIFECYCLE !== '109') {
      return true;
    }
  });
  return false;
};

export const checkIsNot604LifeCycle = (row: API.RowMTZTMI047OUT): boolean => {
  forEach(row.Childs, child => {
    if (child.LIFECYCLE !== '109') {
      return true;
    }
  });
  return false;
};
