import { Meteor } from 'meteor/meteor';
import Notifications from 'react-notification-system-redux';

export function setWatchTogether(messageId, videoId, watchTogether) {
  return dispatch => {
    Meteor.call('videoSetWatchTogether', messageId, videoId, watchTogether, err => {
      if (err) {
        dispatch(Notifications.error({
          title: `An error occurred`,
          message: err.reason,
          position: 'tr',
          autoDismiss: 3,
          dismissible: true,
        }));
      }
    });
  };
}
