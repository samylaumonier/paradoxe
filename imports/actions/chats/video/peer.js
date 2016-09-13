import { chatVideoListenToConnections } from './connection';
import { chatVideoReset } from './reset';
import { chatVideoUpdate } from './update';

export function initVideoPeer(contact, onOpen) {
  return (dispatch, getState) => {
    const peer = new Peer({
      host: Meteor.settings.public.peer.host,
      port: Meteor.settings.public.peer.port,
      path: Meteor.settings.public.peer.path
    });

    peer.on('open', userPeerId => {
      onOpen(userPeerId, peer);
    });

    peer.on('call', call => {
      const stream = getState().chats[contact.username].videoCall.stream;

      call.answer(stream);
      dispatch(chatVideoListenToConnections(contact, peer));

      call.on('stream', contactStream => {
        dispatch(chatVideoUpdate(contact, {
          call,
          contactStream,
        }));
      });
    });

    peer.on('error', console.log);
    peer.on('close', () => console.log('peer close'));
    peer.on('disconnected', () => console.log('peer disconnected'));

    dispatch(chatVideoUpdate(contact, { peer }));
  };
}

export function stopVideoPeer(contact, peer) {
  return (dispatch, getState) => {
    if (peer) {
      dispatch(chatVideoUpdate(contact, {
        isHangingUp: true,
      }));

      const videoCallState = getState().chats[contact.username].videoCall;

      if (videoCallState.call) {
        videoCallState.call.close();
      }

      if (videoCallState.stream) {
        videoCallState.stream.stop();
      }

      videoCallState.peer.destroy();
      dispatch(chatVideoReset(contact));
    }
  };
}
