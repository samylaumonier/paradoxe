import { connect } from 'react-redux';

import { reset } from '/imports/actions/user/reset';

import { ResetPasswordPageComponent } from '/imports/ui/components/pages/ResetPasswordPageComponent';

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    reset: (password) => {
      dispatch(reset(password, props.params.token));
    }
  };
};

export const ResetPasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordPageComponent);
