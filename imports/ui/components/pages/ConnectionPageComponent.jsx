import React from 'react';

import { LoginContainer } from '/imports/ui/containers/parts/user/LoginContainer';
import { RegisterContainer } from '/imports/ui/containers/parts/user/RegisterContainer';

import  '/imports/ui/styles/pages/ConnectionPageComponentStyle.less';

export const ConnectionPageComponent = () => (
  <div id="connection-page">
    <div className="ui center aligned grid child segment">
      <div className="column">
        <h1 className="ui teal image header">
          <div className="content">
            Welcome to Epsilon
          </div>
        </h1>
        <br/>
        <div className="ui large form">
          <div className="ui two column middle aligned very relaxed stackable grid">
            <LoginContainer />
            <RegisterContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
);
