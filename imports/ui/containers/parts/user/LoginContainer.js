import { connect } from 'react-redux';

import { login } from '/imports/actions/user/login';

import { LoginComponent } from '/imports/ui/components/parts/user/LoginComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, callback) => {
      dispatch(login(username, password, callback));
    },
  };
};

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
