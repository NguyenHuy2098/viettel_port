import moment from 'moment';

export const YYYYMMDD = 'YYYYMMDD';

export const sevenDaysAgo = moment()
  .subtract(7, 'day')
  .format(YYYYMMDD);

export const yesterday = moment()
  .subtract(1, 'day')
  .format(YYYYMMDD);

export const today = moment().format(YYYYMMDD);
