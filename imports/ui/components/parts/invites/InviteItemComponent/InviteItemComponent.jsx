import React from 'react';

import { Invitations } from '/imports/api/collections/invitations';
import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

import './InviteItemComponentStyle.less';

export const InviteItemComponent = React.createClass({
  propTypes: {
    invite: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },
  render: function () {
    return (
      <div className="ui card">
        <div className="content">
          <AvatarComponent user={this.props.user} className={"right floated mini ui image"} size={35}/>
          <div className="header">
            {this.props.user.username}
          </div>
          <div className="meta">
            15 days ago
          </div>
          <div className="description">
            {this.props.user.username} would like to add you to their contacts.
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
  onAccept: function () {
    Meteor.call('acceptInvitation', this.props.invite._id, err => {
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
