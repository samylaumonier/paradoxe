import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { isAuthHook } from './hooks/routes/connect';
import { requireAuthHook } from './hooks/routes/main';

import { MainLayout } from '/imports/ui/layouts/MainLayout';
import { UserLayout } from '/imports/ui/layouts/UserLayout';

import { ChatPage } from '/imports/ui/pages/ChatPage/ChatPage';
import { ConnectionPage } from '/imports/ui/pages/ConnectionPage/ConnectionPage';
import { HomePage } from '/imports/ui/pages/HomePage/HomePage';
import { InvitesPage } from '/imports/ui/pages/InvitesPage/InvitesPage';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={UserLayout} onEnter={requireAuthHook}>
      <IndexRoute component={HomePage} />
      <Route path="invites" component={InvitesPage} />
      <Route path="chat/:contactUsername" component={ChatPage} />
    </Route>
    <Route path="/connect" component={MainLayout} onEnter={isAuthHook}>
      <IndexRoute component={ConnectionPage} />
    </Route>
  </Router>
);
