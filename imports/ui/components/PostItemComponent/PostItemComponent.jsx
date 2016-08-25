import { Meteor } from 'meteor/meteor';
import React from 'react';

export const PostItemComponent = React.createClass({
  render: function () {
    return (
    <div className="column">
      <div>
      {/*<div className="ui card">*/}
      <div className="card">
        <div className="content">
          <span className="right floated "><i className="like icon"/> 21 </span>
          <span className="right floated "><i className="star icon"/> 17 </span>
          <div className="header">
            <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/helen.jpg"/>
             {this.username()}
            </div>
          <div className="description">
            {this.props.post.content}
          </div>
        </div>
        <div className="extra content">
      {/*<span className="left floated like">*/}
        {/*<i className="like icon"/>*/}
        {/*Like*/}
      {/*</span>*/}
          <span className="right floated star">
        <i className="clock icon"/>
        15 minutes ago
      </span>
        </div>
      </div>
      </div>
    </div>
    );
  },
  
  username: function () {
    const user = Meteor.users.findOne(this.props.post.userId);
    if (user) {
      return user.username;
    }
  }
});
