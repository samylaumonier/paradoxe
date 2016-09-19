import Notifications from 'react-notification-system-redux';

export function blockContact(contact) {
  return dispatch => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to block this contact?\n If you block this contact, you will no longer get ' +
        'notifications from them and they will no longer see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, block contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('blockContact', contact._id, err => {
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
              title: `Contact blocked`,
              message: `${contact.username} has been blocked!`,
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
