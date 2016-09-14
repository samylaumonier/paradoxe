import { connect } from 'react-redux';

import { addPost } from '/imports/actions/home/posts/add';

import { PostInputComponent } from '/imports/ui/components/parts/home/PostInputComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
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
