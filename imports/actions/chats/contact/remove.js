import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

export function removeContact(contact) {
  return dispatch => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this contact?\n If you delete this contact, they will be removed from ' +
        'your contact list and you will no longer be able to send them messages.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('removeContact', contact._id, err => {
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
        } else {
          browserHistory.push('/posts');
          dispatch(
            Notifications.success({
              title: `Action completed`,
              message: `${contact.username} has been deleted!`,
              position: 'tr',
              autoDismiss: 3,
              dismissible: true,
            })
          );
        }
      });
    });
  };
}
