import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then, Else } from 'react-if';

import Masonry from 'react-masonry-component';

import { PostInputComponent } from '/imports/ui/components/home/PostInputComponent/PostInputComponent';
import { PostItemComponent } from '/imports/ui/components/home/PostItemComponent/PostItemComponent';

import './PostComponentStyle.less'

import { Posts } from '/imports/api/collections/posts';

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
        <div className="ui divider" />
        <h1>Recent posts</h1>
        <If condition={this.props.posts.length !== 0}>
          <Then>
            <Masonry className="posts" options={masonryOptions} updateOnEachImageLoad={true}>
              {this.props.posts.map(post => <PostItemComponent key={post._id} post={post} />)}
            </Masonry>
          </Then>
          <Else>
            <p>No posts yet!</p>
          </Else>
        </If>
      </div>
    );
  }
});

function composer(props, onData) {
  const subscription = Meteor.subscribe('home.posts');

  if (subscription.ready()) {
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

    onData(null, {
      posts
    });
  }
}

export const PostComponent = composeWithTracker(composer)(postPage);
