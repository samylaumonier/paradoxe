import React from 'react';
import numeral from 'numeral';

import {
  CANCELED_STATUS,
  ERROR_STATUS,
  UPLOADED_STATUS,
  UPLOADING_STATUS
} from '/imports/api/collections/messages';

export const ChatShareFileCardComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    fileInfo: React.PropTypes.object.isRequired,
    progress: React.PropTypes.number,
    localFile: React.PropTypes.object,
    uploadHandler: React.PropTypes.object,
    file: React.PropTypes.object,
    downloadLink: React.PropTypes.string,
    startUpload: React.PropTypes.func.isRequired,
    cancelUpload: React.PropTypes.func.isRequired,
    deleteFile: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    if (this.props.fileInfo.status === UPLOADING_STATUS && this.props.localFile && !this.props.uploadHandler) {
      this.props.startUpload(this.props.localFile);
    }

    this.updateProgress();
  },
  componentDidUpdate: function () {
    this.updateProgress();
  },
  updateProgress: function () {
    $(this.refs.progress).progress({
      percent: this.props.progress,
    });
  },
  label: function () {
    if (this.props.fileInfo.status === UPLOADING_STATUS) {
      return 'Uploading';
    } else if  (this.props.fileInfo.status === UPLOADED_STATUS) {
      return 'Uploaded';
    } else if  (this.props.fileInfo.status === CANCELED_STATUS) {
      return 'Canceled';
    } else if  (this.props.fileInfo.status === ERROR_STATUS) {
      return 'An error occurred';
    }

    return '';
  },
  render: function () {
    const disabled = this.props.fileInfo.status === UPLOADING_STATUS ? 'disabled' : '';
    const indicating = this.props.fileInfo.status === UPLOADING_STATUS ? 'indicating' : 'disabled';

    const redButton = this.props.message.sender.includes(this.props.user._id) && this.props.fileInfo.status === UPLOADING_STATUS
      ? <div className="ui basic red button" onClick={this.props.cancelUpload}>Cancel</div>
      : <div className={`ui basic red button ${disabled}`} onClick={this.props.deleteFile}>Delete</div>;

    return (
      <div className="card">
        <div className="content">
          <div className="header">
            {this.props.fileInfo.name}
          </div>
          <div className="meta">
            {numeral(this.props.fileInfo.size).format('0.00 b')} - {this.props.fileInfo.type}
          </div>
          <div className="description">
            <div className={`ui ${indicating} progress`} ref="progress">
              <div className="bar">
                <div className="progress"></div>
              </div>
              <div className="label">
                {this.label()}
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <a
              className={`ui basic green button ${this.props.file === null ? 'disabled' : ''}`}
              href={this.props.downloadLink}
              download={this.props.file ? this.props.file.name : ''}
              target="_parent"
            >
              Download
            </a>
            {redButton}
          </div>
        </div>
      </div>
    );
  },
});
