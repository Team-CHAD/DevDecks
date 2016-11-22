import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App
} from './modules';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
  </Route>
);
