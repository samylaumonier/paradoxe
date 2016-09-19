import Notifications from 'react-notification-system-redux';

export const CHAT_FILES_DROPPED = 'CHAT_FILES_DROPPED';

export function filesDropped(contact, files) {
  return dispatch => {
    const filesInfo = [];
    files.forEach(file => {
      if (!file.id) {
        file.id = Random.id(8);
      }
    
      filesInfo.push({
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
      });
    });
  
    Meteor.call('uploadFile', filesInfo, contact._id, err => {
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
    
    dispatch({
      type: CHAT_FILES_DROPPED,
      contact,
      files,
    });
  }
}
