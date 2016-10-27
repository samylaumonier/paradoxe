import { Meteor } from 'meteor/meteor';
import Notifications from 'react-notification-system-redux';

import { Files } from '/imports/api/collections/files';

export function createGroup(values, unlock) {
  return dispatch => {
    if (!values.name || !values.usernames) {
      unlock(true);
      dispatch(Notifications.error({
        title: 'Error',
        message: 'Please name the group and add at least one contact.',
        position: 'tr',
        autoDismiss: 5,
        dismissible: true,
      }));
    } else if (values.file) {
      const uploadHandler = Files.insert({
        file: values.file,
        meta: {
          profilePicture: true,
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
      }, false);

      uploadHandler.on('end', (err, fileRef) => {
        if (err) {
          unlock(err);
        } else {
          values.pictureId = fileRef._id;
          call(values, dispatch, unlock);
        }
      });

      uploadHandler.on('error', err => {
        dispatch(Notifications.error({
          title: `An error occurred`,
          message: err.reason,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true,
        }));
      });

      uploadHandler.start();
    } else {
      call(values, dispatch, unlock);
    }
  };
}

function call(values, dispatch, unlock) {
  delete values.file;

  Meteor.call('createGroup', values, err => {
    unlock(err);

    if (err) {
      dispatch(Notifications.error({
        title: `An error occurred`,
        message: err.reason,
        position: 'tr',
        autoDismiss: 5,
        dismissible: true,
      }));
    } else {
      dispatch(Notifications.success({
        title: 'Group created',
        message: `The group has been created!`,
        position: 'tr',
        autoDismiss: 5,
        dismissible: true,
      }));
    }
  });
}
