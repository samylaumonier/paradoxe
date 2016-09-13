import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '/imports/store';

import { requireGuestHook } from './hooks/routes/guest';
import { requireAuthHook } from './hooks/routes/auth';

import { MainLayoutComponent } from '/imports/ui/components/layouts/MainLayoutComponent';

import { UserLayoutContainer } from '/imports/ui/containers/layouts/UserLayoutContainer';
import { ConnectionPageComponent } from '/imports/ui/components/pages/ConnectionPageComponent/ConnectionPageComponent';
import { HomePageComponent } from '/imports/ui/components/pages/HomePageComponent/HomePageComponent';

import { ChatPageContainer } from '/imports/ui/containers/pages/ChatPageContainer';
import { InvitesPageContainer } from '/imports/ui/containers/pages/InvitesPageContainer';

const history = syncHistoryWithStore(browserHistory, store);

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={UserLayoutContainer} onEnter={requireAuthHook}>
        <IndexRoute component={HomePageComponent} />
        <Route path="invites" component={InvitesPageContainer} />
        <Route path="chat/:contactUsername" component={ChatPageContainer} />
      </Route>
      <Route path="/connect" component={MainLayoutComponent} onEnter={requireGuestHook}>
        <IndexRoute component={ConnectionPageComponent} />
      </Route>
    </Router>
  </Provider>
);
