import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

export function logout() {
  return () => {
    Meteor.logout(err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        browserHistory.push('/connect');
      }
    });
  };
}
