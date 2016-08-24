import React from 'react';

export const SidebarContactItemComponent = React.createClass({
  render: function () {
    return (
      <div className="item">
        <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/helen.jpg" />
        <div className="content">
          <div className="header">{this.props.contact.username}</div>
        </div>
      </div>
    );
  }
});
