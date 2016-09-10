import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

import './InviteItemComponentStyle.less';

export const InviteItemComponent = React.createClass({
  propTypes: {
    invite: React.PropTypes.object.isRequired,
    acceptInvite: React.PropTypes.func.isRequired,
    declineInvite: React.PropTypes.func.isRequired,
  },
  render: function () {
    if (!this.props.user) {
      return null;
    }

    return (
      <div className="ui card">
        <div className="content">
          <AvatarComponent user={this.props.user} className={"right floated mini ui image"} size={35}/>
          <div className="header">
            {this.props.user.username}
          </div>
          <div className="meta">
            {moment(this.props.invite.sentAt).fromNow()}
          </div>
          <div className="description">
            {this.props.user.username} would like to add you to their contacts.
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div className="ui basic green button" onClick={this.props.acceptInvite}>Accept</div>
            <div className="ui basic red button" onClick={this.props.declineInvite}>Decline</div>
          </div>
        </div>
      </div>
    );
  },
});
