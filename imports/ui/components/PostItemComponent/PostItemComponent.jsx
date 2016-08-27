import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';

import { AvatarComponent } from '../AvatarComponent/AvatarComponent';

import './PostItemComponentStyle.less';

const item = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    currentUserId: React.PropTypes.string.isRequired,
  },
  render: function () {
    return (
      <div className="ui card">
        <div className="content">
          <span className="right floated">
            <i className="like icon"/>
            {this.props.post.likes}
          </span>
          <div className="header">
            <AvatarComponent user={this.props.user} className={"ui avatar image"} size={36}/>
            <span className="username">{this.props.user.username}</span>
          </div>
          <div className="description">
            {this.props.post.content}
          </div>
        </div>
        <div className="extra content">
          <span className="left floated like" onClick={this.like}>
            <i className={"like icon" + this.liked()}/>
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
  like: function () {
    Meteor.call('likePost', this.props.post._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });
  },
  liked: function () {
    return this.props.post.likers.includes(this.props.currentUserId) ? ' post-liked' : '';
  }
});

function composer(props, onData) {
  const userId = Meteor.userId();

  if (userId) {
    onData(null, {
      post: props.post,
      user: Meteor.users.findOne(props.post.userId),
      currentUserId: userId,
    });
  }
}

export const PostItemComponent = composeWithTracker(composer)(item);
