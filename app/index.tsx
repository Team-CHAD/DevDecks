import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './app.global.scss';

import {
  App
} from './modules';

const configureStore = require('./store/configureStore');
const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
