import { connect } from 'react-redux';

//import { likePost } from '/imports/actions/home/posts/like';
//import { deletePost } from '/imports/actions/home/posts/delete';

import { ProductItemComponent } from '/imports/ui/components/parts/store/ProductItemComponent';

const mapStateToProps = (state, props) => {
  return {
//    author: _.findWhere(state.home.users, {
//      _id: props.post.userId,
//    }),
    user: state.user,
//    liked: props.post.likers.includes(state.user._id),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
//    likePost: () => {
//      dispatch(likePost(props.post._id));
//    },
//    deletePost: () => {
//      dispatch(deletePost(props.post._id));
//    }
  };
};

export const ProductItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItemComponent);

