import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

import { isAuthHook } from './hooks/routes/connect';
import { requireAuthHook } from './hooks/routes/main';

import { MainLayoutComponent } from '/imports/ui/components/layouts/MainLayoutComponent';

import { UserLayoutContainer } from '/imports/ui/containers/layouts/UserLayoutContainer';
import { ConnectionPageComponent } from '/imports/ui/components/pages/ConnectionPageComponent/ConnectionPageComponent';
import { HomePageComponent } from '/imports/ui/components/pages/HomePageComponent/HomePageComponent';

import { ChatPageContainer } from '/imports/ui/containers/pages/ChatPageContainer';
import { InvitesPageContainer } from '/imports/ui/containers/pages/InvitesPagesContainer';

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={UserLayoutContainer} onEnter={requireAuthHook}>
        <IndexRoute component={HomePageComponent} />
        <Route path="invites" component={InvitesPageContainer} />
        <Route path="chat/:contactUsername" component={ChatPageContainer} />
      </Route>
      <Route path="/connect" component={MainLayoutComponent} onEnter={isAuthHook}>
        <IndexRoute component={ConnectionPageComponent} />
      </Route>
    </Router>
  </Provider>
);
