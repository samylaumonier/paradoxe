import { DECLINED_STATUS } from '/imports/api/collections/messages';
import { chatVideoUpdate } from './update';

export function declineVideoCall(contact, message) {
  return dispatch => {
    Meteor.call('updateVideoCallStatus', message._id, DECLINED_STATUS);

    dispatch(chatVideoUpdate(contact, {
      isRinging: false,
    }));
  };
}
