import { PeerServer } from 'peer';

export const server = new PeerServer({
  port: Meteor.settings.public.peer.port,
  path: Meteor.settings.public.peer.path
});
