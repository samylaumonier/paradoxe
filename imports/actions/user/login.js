import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';

export function login(username, password) {
  return dispatch => {
    Meteor.loginWithPassword(username, password, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success('Welcome back!', 'Logged in');
        dispatch(push('/'));
      }
    });
  };
}
