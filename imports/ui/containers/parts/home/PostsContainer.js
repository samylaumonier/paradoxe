import { connect } from 'react-redux';

import { loadPosts } from '/imports/actions/home/posts/load';

import { PostsComponent } from '/imports/ui/components/parts/home/PostsComponent';

const mapStateToProps = state => {
  return {
    ready: state.home.ready,
    posts: state.home.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => {
      dispatch(loadPosts());
    }
  };
};

export const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsComponent);
