import { connect } from 'react-redux';

import { forgot } from '/imports/actions/user/forgot';

import { ForgotPasswordPageComponent } from '/imports/ui/components/pages/ForgotPasswordPageComponent';

const mapStateToProps = () => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgot: (email, callback) => {
      dispatch(forgot(email, callback));
    }
  };
};

export const ForgotPasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPageComponent);
