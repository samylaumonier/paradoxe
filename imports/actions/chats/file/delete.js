import Notifications from 'react-notification-system-redux';

export function deleteFile(message, localFileId) {
  return dispatch => {
    swal({
      title: 'Are you sure?',
      text: 'If you delete this file you will not be able to recover it.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete file',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('deleteFile', message._id, localFileId, err => {
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
          dispatch(
            Notifications.success({
              title: `Action completed`,
              message: `The file was deleted successfully.`,
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
