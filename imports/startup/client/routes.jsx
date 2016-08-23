import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from '/imports/ui/layouts/MainLayout';
import { HomePage } from '/imports/ui/pages/HomePage';
import { ConnectionPage } from '/imports/ui/pages/ConnectionPage';
import { UserLayout } from '/imports/ui/layouts/UserLayout';

function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace({
      pathname: '/connect',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={UserLayout} onEnter={requireAuth}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="/connect" component={MainLayout}>
      <IndexRoute component={ConnectionPage} />
    </Route>
  </Router>
);
