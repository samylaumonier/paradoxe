import React from 'react';

import { browserHistory } from 'react-router';

export const SidebarContactItemComponent = React.createClass({
  render: function () {
    return (
      <div className="item" onClick={this.openChat}>
        <span className={"user-status mini ui empty circular label " + this.userStatus(this.props.contact.status)}/>
        <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/helen.jpg"/>
        <div className="content">
          <div className="header">{this.props.contact.username}</div>
        </div>
      </div>
    );
  },
  openChat: function () {
    browserHistory.push(`/chat/${this.props.contact.username}`);
  },
  userStatus: function (status) {
    if (!status) {
      return 'gray';
    } else if (status.idle) {
      return 'orange';
    } else if (status.online) {
      return 'green';
    } else {
      return 'gray';
    }
  }
});
