import React from 'react';

import { LoginComponent } from '/imports/ui/components/parts/user/LoginComponent/LoginComponent';
import { RegisterComponent } from '/imports/ui/components/parts/user/RegisterComponent/RegisterComponent';

import  './ConnectionPageComponentStyle.less';

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
            <LoginComponent />
            <RegisterComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
);
