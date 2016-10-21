import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/chat/ChatNavbarComponentStyle.less';

export const ChatNavbarComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    contactStatus: React.PropTypes.string.isRequired,
    currentVideoCall: React.PropTypes.bool.isRequired,
    userHasBlockedContact: React.PropTypes.bool.isRequired,
    fileListToArray: React.PropTypes.func.isRequired,
    startUploadFiles: React.PropTypes.func.isRequired,
    startVideoCall: React.PropTypes.func.isRequired,
    stopVideoCall: React.PropTypes.func.isRequired,
    sendNudge: React.PropTypes.func.isRequired,
    removeContact: React.PropTypes.func.isRequired,
    blockContact: React.PropTypes.func.isRequired,
    unblockContact: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.initTooltips();
  },
  componentDidUpdate: function () {
    this.initTooltips();
  },
  render: function () {
    const videoCallControl = this.props.currentVideoCall
      ? <a className="ui icon item" data-content="Stop video call" onClick={this.props.stopVideoCall}>
      <i className="icons">
        <i className="record icon"/>
        <i className="red corner remove icon"/>
      </i>
    </a>
      : !this.props.videoCallRinging
      ? <a className="ui icon item" data-content="Start video call" onClick={this.props.startVideoCall}>
      <i className="record icon"/>
    </a>
      : null;
    
    const blockContactControl = this.props.userHasBlockedContact
      ? <a className="ui icon item" data-content="Unblock" onClick={this.props.unblockContact}>
      <i className="icons">
        <i className="user icon"/>
        <i className="green corner dont icon"/>
      </i>
    </a>
      : <a className="ui icon item" data-content="Block" onClick={this.props.blockContact}>
      <i className="icons">
        <i className="user icon"/>
        <i className="red corner dont icon"/>
      </i>
    </a>;
    
    return (
      <div className="ui top attached secondary menu" ref="navbar" id="chat-navbar">
        <a className="ui icon item" data-content="Select a file" onClick={this.openSelectFilesPage}>
          <i className="file icon"/>
        </a>
        <input type="file" className="hidden" ref="files" onChange={this.startUploadFiles} multiple/>
        {/*<a className="ui icon item">*/}
        {/*<i className="game icon"/>*/}
        {/*</a>*/}
        {/*<a className="ui icon item">*/}
        {/*<i className="phone icon"/>*/}
        {/*</a>*/}
        {videoCallControl}
        <a className="ui icon item" data-content="Send a nudge" onClick={this.props.sendNudge}>
          <i className="lightning icon"/>
        </a>
        {blockContactControl}
        <a className="ui icon item" data-content="Remove" onClick={this.props.removeContact}>
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner remove icon"/>
          </i>
        </a>
        <div className="right menu">
          <div className="item">
            <AvatarComponent user={this.props.contact} className={"ui avatar image visible-big"} size={22}/>
            <div className="header">{this.props.contact.username}</div>
            <span className={`user-status mini ui empty circular label visible-big ${this.props.contactStatus}`}/>
          </div>
        </div>
      </div>
    );
  },
  initTooltips: function () {
    $(this.refs.navbar).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'bottom center',
    });
  },
  openSelectFilesPage: function () {
    $(this.refs.files).click();
  },
  startUploadFiles: function (event) {
    const files = this.props.fileListToArray(event.target.files);
    
    if (files) {
      this.props.startUploadFiles(files);
      $(this.refs.files).val('');
    }
  },
});
