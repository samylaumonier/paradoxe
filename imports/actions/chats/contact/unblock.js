import Notifications from 'react-notification-system-redux';

export function unblockContact(contact) {
  return dispatch => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to unblock this contact?\n If you unblock this contact, you will get ' +
        'notifications from them and they will see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, unblock contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('unblockContact', contact._id, err => {
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
        } else {
          dispatch(
            Notifications.success({
              title: `Contact unblocked`,
              message: `${contact.username} has been unblocked!`,
              position: 'tr',
              autoDismiss: 5,
              dismissible: true
            })
          );
        }
      });
    });
  };
}
