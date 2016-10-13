import { connect } from 'react-redux';

import { reset } from '/imports/actions/user/reset';

import { ResetPasswordPageComponent } from '/imports/ui/components/pages/ResetPasswordPageComponent';

const mapStateToProps = () => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    reset: (password, callback) => {
      dispatch(reset(password, props.params.token, callback));
    }
  };
};

export const ResetPasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordPageComponent);
