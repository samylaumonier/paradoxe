import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { PostInputComponent } from '/imports/ui/components/PostInputComponent/PostInputComponent';
import { PostItemComponent } from '/imports/ui/components/PostItemComponent/PostItemComponent';
import './PostComponentStyle.css'

import { Posts } from '/imports/api/collections';

const postPage = React.createClass({
  propTypes: {
    posts: React.PropTypes.array
  },
  render: function () {
    return (
      <div>
        <PostInputComponent />
        <br/>
        <div className="postPage">
          <div className="ui stackable four column grid">
            {this.props.posts.map(post => <PostItemComponent key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    );
  }
});

export const PostComponent = createContainer(() => {
  Meteor.subscribe('posts');
  
  const user = Meteor.user();
  let posts = [];
  
  if (user) {
    const ids = user.profile ? user.profile.contacts : [];
    
    ids.push(user._id);
    
    posts = Posts.find({
      userId: {
        $in: ids
      }
    },{
      sort: {
        createdAt: -1
      }
    }).fetch();
  }
  
  return {
    posts
  };
}, postPage);
