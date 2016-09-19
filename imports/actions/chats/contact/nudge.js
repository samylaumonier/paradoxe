import Notifications from 'react-notification-system-redux';

export function sendNudge(contact) {
  return dispatch => {
    if(contact.status && !contact.status.online){
      dispatch(
        Notifications.error({
          title: `An error occurred`,
          message: `Contact offline.`,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        })
      );
      return false;
    }
    Meteor.call('sendNudge', contact._id, err => {
      if (err) {
        dispatch(
          Notifications.error({
            title: `An error occurred`,
            message: err.reason,
            position: 'tr',
            autoDismiss: 5,
            dismissible: true
          })
        );
      }
    });
  };
}
