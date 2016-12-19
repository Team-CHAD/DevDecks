import { combineReducers } from 'redux';

import {
  undoableAppReducer as app,
  undoableSlidesReducer as slides,
  // notUndoableReducer as undo,
} from '../reducers/index.ts';

const rootReducer = combineReducers({
  app,
  slides,
  // undo,
});

export default rootReducer;
