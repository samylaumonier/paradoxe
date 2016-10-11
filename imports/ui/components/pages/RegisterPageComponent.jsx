import React from 'react';

import { RegisterContainer } from '/imports/ui/containers/parts/user/RegisterContainer';

import  '/imports/ui/styles/pages/RegisterPageComponentStyle.less';

export const RegisterPageComponent = () => (
  <div id="register-page">
    <div className="ui form column grid aligned centered stackable">
      <div className="six wide centered aligned column">
        <div className="ui child segment">
          <RegisterContainer />
          <br/>
          <div className="centered aligned">
            <a href="/login" className="center aligned">I have an account</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
