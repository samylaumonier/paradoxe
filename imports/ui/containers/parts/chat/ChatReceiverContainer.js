import { connect } from 'react-redux';

import { filesDropped } from '/imports/actions/chats/file/dropped';

import { ChatReceiverComponent } from '/imports/ui/components/parts/chat/ChatReceiverComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFileDrop: (event, files) => {
      dispatch(filesDropped(props.contact, files));
    },
  };
};

export const ChatReceiverContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatReceiverComponent);
