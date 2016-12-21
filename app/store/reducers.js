import { combineReducers } from 'redux';

import {
  undoableAppReducer as app,
  undoableSlidesReducer as slides,
} from '../reducers/index.ts';

const rootReducer = combineReducers({
  app,
  slides,
});

export default rootReducer;
