import { composeWithTracker } from 'react-komposer';
import { connect } from 'react-redux';

import { Files } from '/imports/api/collections/files';

import { ChatShareFileCardComponent } from '/imports/ui/components/parts/chat/ChatShareFileCardComponent/ChatShareFileCardComponent';

function composer(props, onData) {
  onData(null, {
    ...props,
    fileRef: props.fileInfo && props.fileInfo.fileId
      ? Files.findOne(props.fileInfo.fileId)
      : undefined,
  });
}

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export const ChatShareFileCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(composeWithTracker(composer)(ChatShareFileCardComponent));
