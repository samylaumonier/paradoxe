import { connect } from 'react-redux';

import { likePost } from '/imports/actions/home/posts/like';

import { PostItemComponent } from '/imports/ui/components/parts/home/PostItemComponent/PostItemComponent';

const mapStateToProps = (state, props) => {
  return {
    author: _.findWhere(state.home.users, {
      _id: props.post.userId,
    }),
    user: state.user,
    liked: props.post.likers.includes(state.user._id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    likePost: () => {
      dispatch(likePost(props.post._id));
    }
  };
};

export const PostItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItemComponent);
