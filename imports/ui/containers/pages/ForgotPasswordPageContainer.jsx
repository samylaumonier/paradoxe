import { connect } from 'react-redux';

import { forgot } from '/imports/actions/user/forgot';

import { ForgotPasswordPageComponent } from '/imports/ui/components/pages/ForgotPasswordPageComponent';

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgot: email => {
      dispatch(forgot(email));
    }
  };
};

export const ForgotPasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPageComponent);
