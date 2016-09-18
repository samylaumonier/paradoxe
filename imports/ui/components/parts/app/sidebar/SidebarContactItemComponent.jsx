import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/app/sidebar/SidebarContactItemComponentStyle.less';

export const SidebarContactItemComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    contactStatus: React.PropTypes.string.isRequired,
    userHasBlockedContact: React.PropTypes.bool.isRequired,
    newMessages: React.PropTypes.array.isRequired,
    incomingCall: React.PropTypes.array.isRequired,
    outgoingCall: React.PropTypes.array.isRequired,
    videoCall: React.PropTypes.array.isRequired,
    nudgeMessages: React.PropTypes.array.isRequired,
    openChat: React.PropTypes.func.isRequired,
    nudgeUser: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.initTooltips();
  },
  componentDidUpdate: function () {
    this.initTooltips();
  },
  componentWillReceiveProps: function (nextProps) {
    // Nudge sound
    if (nextProps.nudgeMessages && nextProps.nudgeMessages.length > this.props.nudgeMessages.length) {
      this.playSound(this.refs.nudge);

      const messages = [];

      nextProps.nudgeMessages.forEach(nudgeMessage => {
        if (nudgeMessage.targetUserId.includes(this.props.user._id)) {
          messages.push(nudgeMessage);
        }
      });

      if (messages.length) {
        this.props.nudgeUser(messages);
      }
    }

    // New message sound
    else if (nextProps.newMessages && nextProps.newMessages.length > this.props.newMessages.length) {
      this.playSound(this.refs.messages);
    }
  },
  playSound: function (audio) {
    audio.currentTime = 0;
    audio.play();
  },
  render: function () {
    const blockedIcon = this.props.userHasBlockedContact ?
      <i className="red dont icon" data-content="Blocked"/> : null;

    const totalNewMessages = this.props.newMessages.length;
    const newMessagesTooltip = `${totalNewMessages} new message${totalNewMessages > 1 ? 's' : ''}`;
    const newMessagesIcon = totalNewMessages ?
      <i className="mail icon" data-content={newMessagesTooltip} /> : null;

    const incomingCallIcon = this.props.incomingCall.length ?
      <i className="green record icon" data-content="Incoming call">
        <audio src="/sounds/incoming.mp3" autoPlay hidden loop/>
      </i> : null;

    const outgoingCallIcon = this.props.outgoingCall.length ?
      <i className="blue record icon" data-content="Outgoing call">
        <audio src="/sounds/outgoing.ogg" autoPlay hidden loop/>
      </i>: null;

    const videoCallIcon = this.props.videoCall.length ?
      <i className="record icon" data-content="Video call" /> : null;

    return (
      <div className="item" onClick={this.props.openChat}>
        <span className={`user-status mini ui empty circular label ${this.props.contactStatus}`}/>
        <AvatarComponent user={this.props.contact} className={"ui avatar image"} size={22}/>
        <div className="content">
          <div className="header" ref="header">
            {this.props.contact.username}
            {blockedIcon}
            {newMessagesIcon}
            {incomingCallIcon}
            {outgoingCallIcon}
            {videoCallIcon}
          </div>
        </div>
        <audio src="/sounds/message.mp3" hidden ref="messages"/>
        <audio src="/sounds/nudge.mp3" hidden ref="nudge"/>
      </div>
    );
  },
  initTooltips: function () {
    $(this.refs.header).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'right center',
      variation: 'mini',
    });
  },
});
