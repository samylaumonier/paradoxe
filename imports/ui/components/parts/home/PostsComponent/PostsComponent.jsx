import React from 'react';
import Masonry from 'react-masonry-component';

import { PostInputContainer } from '/imports/ui/containers/parts/home/PostInputContainer';
import { PostItemContainer } from '/imports/ui/containers/parts/home/PostItemContainer';

import './PostsComponentStyle.less';

const masonryOptions = {
  transitionDuration: 0,
  gutter: 20
};

export const PostsComponent = React.createClass({
  propTypes: {
    ready: React.PropTypes.bool.isRequired,
    posts: React.PropTypes.array.isRequired,
    loadPosts: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadPosts();
  },
  render: function () {
    const posts = this.props.posts.length
      ? <Masonry className="posts" options={masonryOptions} updateOnEachImageLoad={true}>
        {this.props.posts.map(post => <PostItemContainer key={post._id} post={post}/>)}
      </Masonry>
      : <p>No posts yet!</p>;

    return (
      <div>
        <PostInputContainer />
        <div className="ui divider"/>
        <h1>Recent posts</h1>
        {posts}
      </div>
    );
  }
});
