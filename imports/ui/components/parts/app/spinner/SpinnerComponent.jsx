import React from 'react';
import { CubeGrid } from 'better-react-spinkit';

import '/imports/ui/styles/parts/app/spinner/SpinnerComponent.less'

/** @namespace React.PropTypes.object.isRequired */
export const SpinnerComponent = React.createClass({
  childContextTypes: {
    betterReactSpinkit: React.PropTypes.object.isRequired
  },
  getChildContext () {
    return {
      betterReactSpinkit: {
        color: 'green',
        size: 25
      }
    }
  },
  render () {
    // Inline props override the contextual settings.
    return (
      <div className="spinner">
        <CubeGrid size={100} col={6} row={6} color='#95a5a6' />
      </div>
    )
  }
});
