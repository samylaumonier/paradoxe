import { connect } from 'react-redux';

import { addPost } from '/imports/actions/posts/add';

import { PostInputComponent } from '/imports/ui/components/parts/home/PostInputComponent/PostInputComponent';

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: content => {
      dispatch(addPost(content));
    }
  };
};

export const PostInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostInputComponent);
