import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

export const SidebarGroupItemComponent = React.createClass({
  propTypes: {
    group: React.PropTypes.object.isRequired,
    openChat: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div className="item" onClick={this.props.openChat}>
        <AvatarComponent group={this.props.group} className={"ui avatar image"} size={22}/>
        <div className="content">
          <div className="header" ref="header">
            {this.props.group.name}
          </div>
        </div>
      </div>
    );
  },
});
