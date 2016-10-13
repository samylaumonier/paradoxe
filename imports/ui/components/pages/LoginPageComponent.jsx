import React from 'react';

import { LoginContainer } from '/imports/ui/containers/parts/user/LoginContainer';

import  '/imports/ui/styles/pages/LoginPageComponentStyle.less';

export const LoginPageComponent = () => (
  <div id="login-page">
    <div className="ui form column grid aligned centered stackable">
      <div className="six wide centered aligned column">
        <div className="ui child segment">
          <LoginContainer />
          <br/>
          <div className="centered aligned">
            <a href="/register" className="center aligned">I don't have an account</a>
            <br/>
            <a href="/forgot-password" className="center aligned">Forget your password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
