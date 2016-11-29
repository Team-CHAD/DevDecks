import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Import reducers here
import {
  app,
} from '../modules/reducers.ts';

const rootReducer = combineReducers({
  app,
  routing
});

export default rootReducer;
