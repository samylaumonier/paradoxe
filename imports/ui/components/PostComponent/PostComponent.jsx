import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React from 'react';
import Masonry from 'react-masonry-component';

import { PostInputComponent } from '/imports/ui/components/PostInputComponent/PostInputComponent';
import { PostItemComponent } from '/imports/ui/components/PostItemComponent/PostItemComponent';

import './PostComponentStyle.less'

import { Posts } from '/imports/api/collections';

const masonryOptions = {
  transitionDuration: 0,
  gutter: 20
};

const postPage = React.createClass({
  propTypes: {
    posts: React.PropTypes.array
  },
  render: function () {
    return (
      <div>
        <PostInputComponent />
        <Masonry className="posts" options={masonryOptions} updateOnEachImageLoad={true}>
          {this.props.posts.map(post => <PostItemComponent key={post._id} post={post} />)}
        </Masonry>
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
