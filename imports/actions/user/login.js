import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

export function login(username, password) {
  return () => {
    Meteor.loginWithPassword(username, password, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success('Welcome back!', 'Logged in');
        browserHistory.push('/posts');
      }
    });
  };
}
