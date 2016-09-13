import { stopVideoPeer } from './peer';

export function videoCallDeclined(contact, message) {
  return (dispatch, getState) => {
    Meteor.call('setVideoCallDeclined', message._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });

    const videoCallState = getState().chats[contact.username].videoCall;
    dispatch(stopVideoPeer(contact, videoCallState.peer));
  };
}
