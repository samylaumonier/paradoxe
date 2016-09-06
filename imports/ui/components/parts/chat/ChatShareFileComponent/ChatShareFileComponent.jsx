import React from 'react';
import { UploadManager, UploadHandler } from 'react-file-uploader';
import { UPLOADING_STATUS } from '/imports/api/collections/messages';
import numeral from 'numeral';

export const ChatShareFileComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    getFiles: React.PropTypes.func.isRequired,
    onStartUploadFile: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    const files = this.props.getFiles(this.props.message.files.map( file => file.id ));
  
    this.props.message.files.forEach( file => {
        if (file.status === UPLOADING_STATUS) {
           const uploadedFile = this.props.getFiles(file.id);
          $.ajax('/users/uploads/', {
            beforeSend: request => {
              request.setRequestHeader('X-User-Id', Meteor.userId());
              request.setRequestHeader('X-Login-Token', localStorage.getItem('Meteor.loginToken'));
              request.setRequestHeader('X-Contact-Username', this.props.contact.username);
              request.setRequestHeader('X-File-Name', uploadedFile.name);
              request.setRequestHeader('X-File-Type', uploadedFile.type);
              request.setRequestHeader('X-File-Size', uploadedFile.size);
            },
            type: "POST",
            timeout: 50000,
            url: '/user/uploads/',
            data: file,
            processData: false,
            dataType: 'json',
            success: function (data) {
              console.log('success', data);
            },
            fail: function (data) {
              console.log("error", data);
            },
            error: function (request, status, error) {
              console.log(request.responseText);
            },
  
            xhr: function(){
              // get the native XmlHttpRequest object
              var xhr = $.ajaxSettings.xhr() ;
              // set the onprogress event handler
              xhr.upload.onprogress = function(evt){
                console.log('progress', evt.loaded/evt.total*100)
              } ;
              // set the onload event handler
              xhr.upload.onload = function(){ console.log('DONE!') } ;
              // return the customized object
              return xhr ;
            }
        
          });
        }
      }
    )
  },
  getInitialState: function () {
    return {
      headers: {
        'X-User-Id': Meteor.userId(),
        'X-Login-Token': localStorage.getItem('Meteor.loginToken'),
        'X-Contact-Username': this.props.contact.username
      },
      files: this.props.getFiles(this.props.message.files.map( file => file.id ))
    }
  },
  render: function () {
    return (
      <div>
        <div className="ui cards">
         
        {this.props.message.files.map( file =>
          <div className="card" key = {file.id}>
            
            <div className="content">
              <img className="right floated mini ui image" src="/images/avatar/large/elliot.jpg"/>
                <div className="header">
                  {file.name}
                </div>
                <div className="meta">
                  {numeral(file.size).format('0.00 b')} - {file.type}
                </div>
                <div className="description">
                  <div className="ui purple indicating progress">
                    <div className="bar"></div>
                    <div className="label">Progress</div>
                  </div>
                </div>
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div className="ui basic green button" onClick={ () => {this.props.onStartUploadFile(file.id)}}>Upload</div>
                <div className="ui basic red button">Cancel</div>
              </div>
            </div>
          
          </div>
        )}
          </div>
      </div>
    );
  },
  onUploadStart: function (file) {
    console.log(file)
  },
  onUpload: function (file) {
    console.log(file)
  },
  onUploadProgress: function (file) {
    console.log(file)
  },
  onUploadEnd: function (file) {
    console.log(file)
  },
});
