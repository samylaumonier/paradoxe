import React from 'react';
import emojione from 'emojione';

import '/imports/ui/styles/pages/NotFoundPageComponentStyle.less';
emojione.ascii = true;

export const NotFoundPageComponent = () => (
  <div id="not-found-container">
    <div id="not-found-div" >
      <img src="/images/404.png" alt="404 image"/>
      <h1>The page you are looking for was not found.</h1>
      <p>I will send you a message as soon as we find it.
        <span dangerouslySetInnerHTML={{__html: emojione.toImage(':)')}} />
      </p>
    </div>
  </div>
);
