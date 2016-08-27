import { Meteor } from 'meteor/meteor';
import React from 'react';

import './PostItemComponentStyle.less';

export const PostItemComponent = React.createClass({
  render: function () {
    return (
      <div className="ui card">
        <div className="content">
          <span className="right floated">
            <i className="like icon"/>
            {this.props.post.likes}
          </span>
          <div className="header">
            <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/helen.jpg"/>
            <span className="username">{this.username()}</span>
          </div>
          <div className="description">
            {this.props.post.content}
          </div>
        </div>
        <div className="extra content">
          <span className="left floated like">
            <i className="like icon" onClick={this.like}/>
            Like
          </span>
          <span className="right floated">
            <i className="clock icon"/>
            {moment(this.props.post.createdAt).fromNow()}
          </span>
        </div>
      </div>
    );
  },
  username: function () {
    const user = Meteor.users.findOne(this.props.post.userId);
    if (user) {
      return user.username;
    }
  },
  like: function () {
    Meteor.call('likePost', this.props.post._id, err => {
      if(err){
        toastr.error(err.reason, 'Error');
      }
    });
  }
});
