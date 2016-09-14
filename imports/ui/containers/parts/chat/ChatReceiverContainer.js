import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { ChatReceiverComponent } from '/imports/ui/components/parts/chat/ChatReceiverComponent';

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFileDrop: (e, files) => {
      const fileInfo = [];

      files.forEach(file => {
        fileInfo.push({
          id: file.id,
          name: file.name,
          type: file.type,
          size: file.size
        });

        ownProps.onAddFile(file);
      });

      Meteor.call('uploadFile', fileInfo, ownProps.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        }
      });
    },
  };
};

export const ChatReceiverContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatReceiverComponent);
