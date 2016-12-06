import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const enhancer = applyMiddleware();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
