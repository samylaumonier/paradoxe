import { Meteor } from 'meteor/meteor';

import client from 'socket.io-client';
import { USER_INITIALIZE } from '/imports/api/socket/user';

const settings = Meteor.settings.public.socket;
export let socket = null;

export function connect() {
  socket = client(`${settings.protocol}://${settings.host}:${settings.port}`);

  socket.on('connect', () => {
    socket.emit(USER_INITIALIZE, {
      userId: Meteor.userId(),
      loginToken: localStorage.getItem('Meteor.loginToken'),
    });
  });
}
