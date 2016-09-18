import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '/node_modules/peerjs_fork_firefox40/dist/peer.min';
import '/node_modules/animate.css/animate.min.css';

import '/imports/startup/client/status';

import { renderRoutes } from '/imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
