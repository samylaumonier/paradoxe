import Notifications from 'react-notification-system-redux';

import { Files } from '/imports/api/collections/files';

export const SETTINGS_PICTURE_UPDATE = 'SETTINGS_PICTURE_UPDATE';

export function uploadProfilePicture(file) {
  return dispatch => {
    if (!file.id) {
      file.id = Random.id(8);
    }

    const uploadHandler = Files.insert({
      file,
      meta: {
        profilePicture: true,
      },
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);

    uploadHandler.localFileId = file.id;

    uploadHandler.on('start', () => {
      dispatch({
        type: SETTINGS_PICTURE_UPDATE,
        uploading: true,
        progress: 0,
      });
    });

    uploadHandler.on('end', (err, fileRef) => {
      if (!err) {
        Meteor.call('setProfilePicture', fileRef._id, err => {
          if (err) {
            dispatch(Notifications.error({
              title: `An error occurred`,
              message: err.reason,
              position: 'tr',
              autoDismiss: 5,
              dismissible: true
            }));
          } else {
            dispatch(Notifications.success({
              title: 'Profile picture uploaded',
              message: 'Your profile picture has been uploaded.',
              position: 'tr',
              autoDismiss: 5,
              dismissible: true
            }));
          }
        });
      }

      dispatch({
        type: SETTINGS_PICTURE_UPDATE,
        uploading: false,
        progress: 0,
      });
    });

    uploadHandler.on('error', err => {
      dispatch(Notifications.error({
        title: `An error occurred`,
        message: err.reason,
        position: 'tr',
        autoDismiss: 5,
        dismissible: true
      }));
    });

    uploadHandler.on('progress', percent => {
      dispatch({
        type: SETTINGS_PICTURE_UPDATE,
        uploading: true,
        progress: percent,
      });
    });

    uploadHandler.start();
  }
}
