import { CANCELED_STATUS } from '/imports/api/collections/messages';
import { updateFileStatus } from './upload';

export function cancelUpload(contact, message, localFileId) {
  return (dispatch, getState) => {
    const uploadHandlers = getState().chats[contact.username].uploadHandlers;

    const uploadHandler = _.findWhere(uploadHandlers, {
      localFileId,
    });

    if (uploadHandler) {
      uploadHandler.abort();
    } else {
      dispatch(updateFileStatus(message, localFileId, CANCELED_STATUS));
    }
  };
}
