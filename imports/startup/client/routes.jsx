import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from '/imports/store';

import { requireGuestHook } from './hooks/routes/guest';
import { requireAuthHook } from './hooks/routes/auth';
import { logPageView } from './hooks/routes/ga';
import { verifyUser } from './hooks/routes/verify';

import { MainLayoutContainer } from '/imports/ui/containers/layouts/MainLayoutContainer';

import { UserLayoutContainer } from '/imports/ui/containers/layouts/UserLayoutContainer';
import { ConnectionPageComponent } from '/imports/ui/components/pages/ConnectionPageComponent';
import { ResetPasswordPageContainer } from '/imports/ui/containers/pages/ResetPasswordPageContainer';
import { ForgotPasswordPageContainer } from '/imports/ui/containers/pages/ForgotPasswordPageContainer';
import { HomePageComponent } from '/imports/ui/components/pages/HomePageComponent';
import { LandingPageComponent } from '/imports/ui/components/pages/LandingPageComponent';

import { ChatPageContainer } from '/imports/ui/containers/pages/ChatPageContainer';
import { InvitesPageContainer } from '/imports/ui/containers/pages/InvitesPageContainer';

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/verify-email/:token" onEnter={verifyUser}/>
      <Route path="/" component={MainLayoutContainer} onEnter={requireGuestHook}>
        <IndexRoute component={LandingPageComponent}/>
        <Route path="connect" component={ConnectionPageComponent}/>
        <Route path="reset-password/:token" component={ResetPasswordPageContainer}/>
        <Route path="forgot-password" component={ForgotPasswordPageContainer}/>
      </Route>
      <Route path="/" component={UserLayoutContainer} onEnter={requireAuthHook}>
        <Route path="invites" component={InvitesPageContainer}/>
        <Route path="posts" component={HomePageComponent}/>
        <Route path="chat/:contactUsername" component={ChatPageContainer}/>
      </Route>
    </Router>
  </Provider>
);
