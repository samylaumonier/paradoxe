import Notifications from 'react-notification-system-redux';

import { chatVideoUpdate } from './update';
import { DECLINED_STATUS } from '/imports/api/collections/messages';

export function declineVideoCall(contact, message, unlock) {
  return dispatch => {
    Meteor.call('updateVideoCallStatus', message._id, DECLINED_STATUS, err => {
      unlock();

      if (err) {
        dispatch(Notifications.error({
          title: 'An error occurred',
          message: err.reason,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        }));
      } else {
        dispatch(chatVideoUpdate(contact, {
          isRinging: false,
        }));
      }
    });
  };
}
