import { connect } from 'react-redux';

import { login } from '/imports/actions/user/login';

import { LoginComponent } from '/imports/ui/components/parts/user/LoginComponent/LoginComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    },
  };
};

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
