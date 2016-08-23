import { Meteor } from 'meteor/meteor';

import '/imports/api/PeerServer';
import '/imports/startup/server/accounts';
import '/imports/startup/server/publications/main';

Meteor.startup(() => {
});
