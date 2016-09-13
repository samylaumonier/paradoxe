import { Accounts } from 'meteor/accounts-base';
import { push } from 'react-router-redux';

export function register(username, email, password) {
  return dispatch => {
    Accounts.createUser({
      username,
      email,
      password,
    }, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success(`Welcome ${username}!`);
        dispatch(push('/'));
      }
    });
  };
}
