import React from 'react';
import { If, Then, Else } from 'react-if';
import EmojiPicker from 'emojione-picker';
import { Receiver } from 'react-file-uploader';

import { ChatNavbarContainer } from '/imports/ui/containers/parts/chat/ChatNavbarContainer';
import { ChatMessageContainer } from '/imports/ui/containers/parts/chat/ChatMessageContainer';
import { ChatTaggedMessageContainer } from '/imports/ui/containers/parts/chat/ChatTaggedMessageContainer';

import { ChatMessageFormComponent } from '/imports/ui/components/parts/chat/ChatMessageFormComponent/ChatMessageFormComponent';

import './ChatComponentStyle.less';

export const ChatComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired,
    currentCall: React.PropTypes.bool.isRequired,
    startVideoCall: React.PropTypes.func.isRequired,
    stopVideoCall: React.PropTypes.func.isRequired,
    onAnswer: React.PropTypes.func.isRequired,
    onDecline: React.PropTypes.func.isRequired,
    onHangUp: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onMissed: React.PropTypes.func.isRequired,
    onAddFile: React.PropTypes.func.isRequired,
    onStartUploadFile: React.PropTypes.func.isRequired,
    getFiles: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      selectedEmoji: null
    };
  },
  render: function () {
    return (
  <div>
      <Receiver
        isOpen={true}
        onDragEnter={
          function () {
            console.log("On enter")
          }
        }
        onDragOver={
          function () {
            console.log("On over")
          }
        }
        onDragLeave={
          function () {
            console.log("On leave")
          }
        }
        onFileDrop={
          
          (e, files, props) => {
            props = this.props;
  
            const fileInfo = [];
            
            files.forEach( (file) => {
              
              fileInfo.push(
                {
                  id: file.id,
                  name: file.name,
                  type: file.type,
                  size: file.size
                }
              );
              
              this.props.onAddFile(file);
              
              console.log(file);
              
              
            });
  
            Meteor.call('uploadFile', fileInfo, this.props.contact._id, err => {
              if(err){
                
              } else{
                
              }
            });
            
            
          }
        }
      >
      
      <div id="chat">
        <ChatNavbarContainer
          contact={this.props.contact}
          currentCall={this.props.currentCall}
          startVideoCall={this.props.startVideoCall}
          stopVideoCall={this.props.stopVideoCall}
        />

        <div id="message-zone" ref="messages">
          <If condition={this.props.messages.length !== 0}>
            <Then>
              <div className="ui comments">
                {this.props.messages.map(message => message.tag
                  ? <ChatTaggedMessageContainer
                    key={message._id}
                    contact={this.props.contact}
                    message={message}
                    onAnswer={this.props.onAnswer}
                    onDecline={this.props.onDecline}
                    onHangUp={this.props.onHangUp}
                    onCancel={this.props.onCancel}
                    onMissed={this.props.onMissed}
                    onStartUploadFile={this.props.onStartUploadFile}
                    getFiles={this.props.getFiles}
                  />
                  : <ChatMessageContainer
                    key={message._id}
                    message={message}
                  />
                )}
              </div>
            </Then>
            <Else>
              <p>No messages yet!</p>
            </Else>
          </If>
        </div>

        <div id="emojis-container" ref="emojis">
          <EmojiPicker search={true} onChange={this.onSelectEmoji} />
        </div>

        <ChatMessageFormComponent
          contact={this.props.contact}
          setMessagesHeight={this.setMessagesHeight}
          scrollToBottom={this.scrollToBottom}
          toggleEmojis={this.toggleEmojis}
          unselectEmoji={this.unselectEmoji}
          selectedEmoji={this.state.selectedEmoji}
        />
      </div>

      </Receiver>
  </div>
    );
  },
  setMessagesHeight: function (height) {
    $(this.refs.messages).css('bottom', `${height}px`);
    $(this.refs.emojis).css('bottom', `${height}px`);
  },
  scrollToBottom: function () {
    const messages = $(this.refs.messages);

    messages.animate({
      scrollTop: messages.prop('scrollHeight')
    }, 500);
  },
  toggleEmojis: function (event = null) {
    if (event) {
      event.preventDefault();
    }

    $(this.refs.emojis).toggle();
  },
  unselectEmoji: function () {
    this.setState({
      selectedEmoji: null
    });
  },
  onSelectEmoji: function (emoji) {
    this.setState({
      selectedEmoji: emoji
    });

    this.toggleEmojis();
  },
});
