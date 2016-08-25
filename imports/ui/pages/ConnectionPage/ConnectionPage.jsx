import React from 'react';

import  './ConnectionPageStyle.less';

import { LoginComponent } from '/imports/ui/components/LoginComponent/LoginComponent';
import { RegisterComponent } from '/imports/ui/components/RegisterComponent/RegisterComponent';


export const ConnectionPage = () => (
  <div id="connection-page">
    <div className="ui middle aligned center aligned grid child segment">
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
            <div className="ui vertical divider">
              Or
            </div>
            <RegisterComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
);



