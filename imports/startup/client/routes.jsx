import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from '/imports/ui/layouts/MainLayout';
import { UserLayout } from '/imports/ui/layouts/UserLayout';

import { HomePage } from '/imports/ui/pages/HomePage/HomePage';
import { InvitesPage } from '/imports/ui/pages/InvitesPage/InvitesPage';
import { ConnectionPage } from '/imports/ui/pages/ConnectionPage/ConnectionPage';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={UserLayout} onEnter={requireAuth}>
      <IndexRoute component={HomePage} />
      <Route path="invites" component={InvitesPage} />
    </Route>
    <Route path="/connect" component={MainLayout} onEnter={isAuth}>
      <IndexRoute component={ConnectionPage} />
    </Route>
  </Router>
);

function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace({
      pathname: '/connect',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function isAuth(nextState, replace) {
  if (Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
