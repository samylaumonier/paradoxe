import { connect } from 'react-redux';

import { register } from '/imports/actions/user/register';

import { RegisterComponent } from '/imports/ui/components/parts/user/RegisterComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, email, password) => {
      dispatch(register(username, email, password));
    },
  };
};

export const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
