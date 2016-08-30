import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';

import { AvatarComponent } from '/imports/ui/components/user/AvatarComponent/AvatarComponent';


const item = React.createClass({
  propTypes: {
    notification: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },
  render: function () {
    return (
    <a className="item">
      <AvatarComponent user={this.props.user} className={"ui avatar image"}/>
      <b className="username">{this.props.user.username}</b>
      <p className="header">Has sent you a message.</p>
    </a>
    );
  },
});

function composer(props, onData) {
  onData(null, {
    notification: props.notification,
    user: Meteor.users.findOne(props.notification.targetId)
  });
}

export const NavabarNotificationItemComponent = composeWithTracker(composer)(item);
