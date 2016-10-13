import { connect } from 'react-redux';

import { register } from '/imports/actions/user/register';

import { RegisterComponent } from '/imports/ui/components/parts/user/RegisterComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, email, password, callback) => {
      dispatch(register(username, email, password, callback));
    },
  };
};

export const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
