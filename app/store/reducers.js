import { combineReducers } from 'redux';

import {
  appReducer as app,
  slidesReducer as slides,
} from '../reducers/index.ts';

const rootReducer = combineReducers({
  app,
  slides,
});

export default rootReducer;
