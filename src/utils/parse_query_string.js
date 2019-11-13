import { get } from 'lodash';

export default function parse_query_string(param = '', valueDefault = '') {
  try {
    let query = get(window, 'location.search', '');
    query = query.substring(1);
    const vars = query.split('&');
    const query_string = {};
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === 'undefined') {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === 'string') {
        const arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string[param] ? query_string[param] : valueDefault;
  } catch (error) {
    return valueDefault;
  }
}
