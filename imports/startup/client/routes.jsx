import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from '/imports/ui/layouts/MainLayout';
import { HomePage } from '/imports/ui/pages/HomePage';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={HomePage} />
    </Route>
  </Router>
);
