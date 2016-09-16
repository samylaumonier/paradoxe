import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

export const ProfilePictureComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },
  
  render: function () {
    return (
      <div>
        <div className="ui bottom attached segment">
          <div className="ui card">
            <a className="image" href="#">
              <AvatarComponent user={this.props.user} size={145}/>
            </a>
            <div className="content">
              <a className="header" href="#">{this.props.user.username}</a>
              <div className="meta">
                <a>Last Seen 2 days ago</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
