import * as _ from 'lodash';

/* 
 * Since we only use cloneDeep, we should extract only that function out of
 * lodash instead of importing the whole library
 */
const cloneDeep = _.cloneDeep;
const debounce = _.debounce;
const throttle = _.throttle;

export {
  cloneDeep,
  debounce,
  throttle,
};
