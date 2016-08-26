import React from 'react';

import { Invitations } from '/imports/api/collections';

import './InviteItemComponentStyle.less';

export const InviteItemComponent = React.createClass({
  propTypes: {
    invite: React.PropTypes.object
  },
  render: function () {
    return (
      <div className="ui card">
        <div className="content">
          <img className="right floated mini ui image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg" />
          <div className="header">
            {this.username()}
          </div>
          <div className="meta">
            15 days ago
          </div>
          <div className="description">
            {this.username()} would like to add you to their contacts.
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div className="ui basic green button" onClick={this.onAccept}>Accept</div>
            <div className="ui basic red button" onClick={this.onDecline}>Decline</div>
          </div>
        </div>
      </div>
    );
  },
  username: function () {
    const user = Meteor.users.findOne(this.props.invite.userId);
    return user ? user.username : '';
  },
  onAccept: function () {
    Meteor.call('acceptContact', this.props.invite._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        Invitations.remove(this.props.invite._id);
        toastr.success('Invitation accepted');
      }
    });
  },
  onDecline: function () {
    Invitations.remove(this.props.invite._id);
    toastr.success('Invitation declined');
  }
});
