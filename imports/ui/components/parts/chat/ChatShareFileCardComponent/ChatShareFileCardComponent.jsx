import React from 'react';
import { If, Then, Else } from 'react-if';
import numeral from 'numeral';

import {
  CANCELED_STATUS,
  ERROR_STATUS,
  UPLOADED_STATUS,
  UPLOADING_STATUS
} from '/imports/api/collections/messages';
import { Files } from '/imports/api/collections/files';

export const ChatShareFileCardComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    fileInfo: React.PropTypes.object.isRequired,
    file: React.PropTypes.object,
    fileRef: React.PropTypes.object,
  },
  getInitialState: function () {
    return {
      upload: this.props.file && this.props.fileInfo.status === UPLOADING_STATUS
        ? Files.insert({
          file: this.props.file,
          meta: {
            contactId: [this.props.contact._id],
          },
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false)
        : null,
    };
  },
  componentDidMount: function () {
    const progress = $(this.refs.progress);

    if (this.state.upload !== null) {
      this.state.upload.on('start', () => {
        progress.progress({
          percent: 0,
        });
      });

      this.state.upload.on('end', (err, fileRef) => {
        if (!err) {
          Meteor.call('updateFileStatus', this.props.message._id, this.props.fileInfo.id, UPLOADED_STATUS, fileRef._id, err => {
            if (err) {
              toastr.error(err.reason, 'Error');
            }
          });
        }
      });

      this.state.upload.on('error', err => {
        toastr.error(err.reason, 'Error');

        Meteor.call('updateFileStatus', this.props.message._id, this.props.fileInfo.id, ERROR_STATUS, err => {
          if (err) {
            toastr.error(err.reason, 'Error');
          }
        });
      });

      this.state.upload.on('progress', percent => {
        progress.progress({
          percent,
        });
      });

      this.state.upload.on('abort', () => {
        Meteor.call('updateFileStatus', this.props.message._id, this.props.fileInfo.id, CANCELED_STATUS, err => {
          if (err) {
            toastr.error(err.reason, 'Error');
          }
        });
      });

      this.state.upload.start();
    } else if (this.props.fileInfo.status === UPLOADED_STATUS) {
      progress.progress({
        percent: 100,
      });
    }
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
            <div className="ui indicating progress" ref="progress">
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
              className={`ui basic green button ${this.props.fileRef === null ? 'disabled' : ''}`}
              href={`${this.props.fileRef ? this.props.fileRef.link()  : ''}?download=true`}
              download={this.props.fileRef ? this.props.fileRef.name : ''}
              target="_parent"
            >
              Download
            </a>
            <If condition={this.props.file !== undefined && this.props.fileInfo.status === UPLOADING_STATUS}>
              <Then>
                <div className="ui basic red button" onClick={this.onCancel}>
                  Cancel
                </div>
              </Then>
              <Else>
                <div
                  className={`ui basic red button ${this.props.fileInfo.status === UPLOADING_STATUS ? 'disabled' : ''}`}
                  onClick={this.onDelete}
                >
                  Delete
                </div>
              </Else>
            </If>
          </div>
        </div>
      </div>
    );
  },
  onCancel: function () {
    if (this.state.upload) {
      this.state.upload.abort();
    }
  },
  onDelete: function () {
    Meteor.call('deleteFile', this.props.message._id, this.props.fileInfo.id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success('File deleted.');
      }
    });
  },
});
