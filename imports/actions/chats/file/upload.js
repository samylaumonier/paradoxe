import { Files } from '/imports/api/collections/files';
import { cleanChatFiles } from './clean';

import Notifications from 'react-notification-system-redux';

import {
  CANCELED_STATUS,
  ERROR_STATUS,
  UPLOADED_STATUS
} from '/imports/api/collections/messages';

export const CHAT_FILES_UPLOAD_STARTED = 'CHAT_FILES_UPLOAD_STARTED';

export function startUpload(contact, message, file) {
  return dispatch => {
    const uploadHandler = Files.insert({
      file,
      meta: {
        contactId: [contact._id],
      },
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);

    uploadHandler.localFileId = file.id;

    uploadHandler.on('start', () => {
      dispatch(updateFileProgress(message, file, 0));
    });

    uploadHandler.on('end', (err, fileRef) => {
      if (!err) {
        dispatch(updateFileStatus(message, file.id, UPLOADED_STATUS, fileRef._id));
      }

      dispatch(cleanChatFiles(contact, file.id));
    });

    uploadHandler.on('error', err => {
      dispatch(
        Notifications.error({
          title: `An error occurred`,
          message: err.reason,
          position: 'tr',
          autoDismiss: 5,
          dismissible: true
        })
      );
      dispatch(updateFileStatus(message, file.id, ERROR_STATUS));
    });

    uploadHandler.on('progress', percent => {
      dispatch(updateFileProgress(message, file, percent));
    });

    uploadHandler.on('abort', () => {
      updateFileStatus(message, file.id, CANCELED_STATUS);
      dispatch(cleanChatFiles(contact, file.id));
    });

    uploadHandler.start();

    dispatch({
      type: CHAT_FILES_UPLOAD_STARTED,
      contact,
      uploadHandler,
    });
  };
}

function updateFileProgress(message, file, progress) {
  return dispatch => {
    Meteor.call('updateFileProgress', message._id, file.id, progress, err => {
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
  }
}

export function updateFileStatus(message, localFileId, status, fileRefId = null) {
  return dispatch => {
    Meteor.call('updateFileStatus', message._id, localFileId, status, fileRefId, err => {
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
  }
}
