import { PeerServer } from 'peer';

export const server = new PeerServer({
  port: Meteor.settings.peer.port,
  path: Meteor.settings.public.peer.path,
  proxied: Meteor.settings.peer.proxied,
});
