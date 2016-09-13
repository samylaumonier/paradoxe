import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '/node_modules/peerjs_fork_firefox40/dist/peer.min';

import '/imports/startup/client/status';
import '/imports/startup/client/spinner';

import { renderRoutes } from '/imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
