import React from 'react';
import { If, Then, Else } from 'react-if';

import Masonry from 'react-masonry-component';

import { PostInputComponent } from '/imports/ui/components/parts/home/PostInputComponent/PostInputComponent';
import { PostItemContainer } from '/imports/ui/containers/parts/home/PostItemContainer';

import './PostsComponentStyle.less';

const masonryOptions = {
  transitionDuration: 0,
  gutter: 20
};

export const PostsComponent = React.createClass({
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
              {this.props.posts.map(post => <PostItemContainer key={post._id} post={post} />)}
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
