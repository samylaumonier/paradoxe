import React from 'react';
import { setDefaultLoadingComponent, } from 'react-komposer';

const spinnerComponent = () => (
  <div className="ui active inline loader spinner" style={{"margin-top": "5%", "margin-left": "50%"}}></div>
);

setDefaultLoadingComponent(spinnerComponent);
