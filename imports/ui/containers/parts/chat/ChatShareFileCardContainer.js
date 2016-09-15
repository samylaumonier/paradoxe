import { connect } from 'react-redux';

import { Files } from '/imports/api/collections/files';
import { startUpload } from '/imports/actions/chats/file/upload';
import { cancelUpload } from '/imports/actions/chats/file/cancel';
import { deleteFile } from '/imports/actions/chats/file/delete';

import { ChatShareFileCardComponent } from '/imports/ui/components/parts/chat/ChatShareFileCardComponent';

const mapStateToProps = (state, props) => {
  const file = props.fileInfo.fileId
    ? _.findWhere(state.chats[props.contact.username].files, {
      _id: props.fileInfo.fileId,
    })
    : null;

  return {
    user: state.user,
    progress: props.fileInfo.progress || 0,
    localFile: _.findWhere(state.chats[props.contact.username].localFiles, {
      id: props.fileInfo.id,
    }),
    uploadHandler: _.findWhere(state.chats[props.contact.username].uploadHandlers, {
      localFileId: props.fileInfo.id,
    }),
    file,
    downloadLink: file ? `${Files.link(file)}?download=true` : null,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startUpload: file => {
      dispatch(startUpload(props.contact, props.message, file));
    },
    cancelUpload: () => {
      dispatch(cancelUpload(props.contact, props.message, props.fileInfo.id));
    },
    deleteFile: () => {
      dispatch(deleteFile(props.message, props.fileInfo.id));
    },
  };
};

export const ChatShareFileCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatShareFileCardComponent);
