import { forEach } from 'lodash';

export const recordHasAtLeastOneChildHaveLifeCycle108 = (el: API.RowMTZTMI047OUT): boolean => {
  let haveLifeCycle108 = false;
  forEach(el.Childs, child => {
    if (child.LIFECYCLE === '108') {
      haveLifeCycle108 = true;
    }
  });
  return haveLifeCycle108;
};

export const recordHaveAtLeastOneChildHaveLifeCycle603Or403 = (el: API.RowMTZTMI047OUT): boolean => {
  let haveLifeCycle603Or403 = false;
  forEach(el.Childs, child => {
    if (child.LIFECYCLE === '603' || child.LIFECYCLE === '403') {
      haveLifeCycle603Or403 = true;
    }
  });
  return haveLifeCycle603Or403;
};
