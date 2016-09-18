import React from 'react';
import nl2br from 'react-nl2br';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/home/PostItemComponentStyle.less';

export const PostItemComponent = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    author: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    liked: React.PropTypes.bool.isRequired,
    likePost: React.PropTypes.func.isRequired,
    deletePost: React.PropTypes.func.isRequired,
  },
  render: function () {
    const canDelete = this.props.post.userId === this.props.user._id ?
      <a className="reply" onClick={this.props.deletePost}>
        <i className="trash outline icon"/>
      </a> :
      <span/>;
    
    return (
      <div className="ui card">
        <div className="content">
          <span className="right floated">
            {canDelete}
            <i className="like icon"/>
            {this.props.post.likes}
          </span>
          <div className="header">
            <AvatarComponent user={this.props.author} className={"ui avatar image"} size={36}/>
            <span className="username">{this.props.author.username}</span>
          </div>
          <div className="description">
            {nl2br(this.props.post.content)}
          </div>
        </div>
        <div className="extra content">
          <span className="left floated like" onClick={this.props.likePost}>
            <i className={`like icon ${this.props.liked ? 'post-liked' : ''}`}/>
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
});
