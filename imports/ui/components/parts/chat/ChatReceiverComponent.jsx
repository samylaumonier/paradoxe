import React from 'react';
import { Receiver } from 'react-file-uploader';

import '/imports/ui/styles/parts/chat/ChatReceiverComponentStyle.less';

export const ChatReceiverComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    contact: React.PropTypes.object.isRequired,
    onFileDrop: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      modalIsOpen: false,
    };
  },
  render: function () {
    return (
      <Receiver
        isOpen={true}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onFileDrop={this.onFileDrop}
      >
        {this.props.children}
        <div className="ui basic modal" ref="modal" id="drop-files-modal">
          <div className="header">
            Drop to upload!
          </div>
          <div className="content">
            <div className="description">
              <p className="ui center aligned">
                Drop your files here and they will be send to your contact.
              </p>
              <i className="upload icon" />
            </div>
          </div>
        </div>
      </Receiver>
    );
  },
  onDragEnter: function () {

  },
  onDragOver: function () {
    if (!this.state.modalIsOpen) {
      this.setState({
        modalIsOpen: true,
      }, () => {
        $(this.refs.modal).modal('show');
      });
    }
  },
  onDragLeave: function () {
    this.hideModal();
  },
  hideModal: function () {
    this.setState({
      modalIsOpen: false,
    }, () => {
      $(this.refs.modal).modal('hide');
    });
  },
  onFileDrop: function (e, files) {
    this.hideModal();
    this.props.onFileDrop(e, files);
  }
});
