import { forEach } from 'lodash';

export const checkIsNot109LifeCycle = (row: API.RowMTZTMI047OUT): boolean => {
  let isNot109LifeCycle = false;
  forEach(row.Childs, child => {
    if (child.LIFECYCLE !== '109') {
      isNot109LifeCycle = true;
    }
  });
  return isNot109LifeCycle;
};

export const checkIsNot604LifeCycle = (row: API.RowMTZTMI047OUT): boolean => {
  let isNot604LifeCycle = false;
  forEach(row.Childs, child => {
    if (child.LIFECYCLE !== '604') {
      isNot604LifeCycle = true;
    }
  });
  return isNot604LifeCycle;
};
