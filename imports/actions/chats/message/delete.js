import Notifications from 'react-notification-system-redux';

export function deleteMessage(messageId) {
  return dispatch => {
    swal({
      title: 'Are you sure?',
      text: 'If you delete this message you will not be able to recover it.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete message',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('deleteMessage', messageId, err => {
        if (err) {
          dispatch(
            Notifications.error({
              title: `An error occurred`,
              message: err.reason,
              position: 'tr',
              autoDismiss: 3,
              dismissible: true,
            })
          );
        }
      });
    });
  }
}
