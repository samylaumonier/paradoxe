import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

export function register(username, email, password) {
  return () => {
    Accounts.createUser({
      username,
      email,
      password,
    }, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success(`Welcome ${username}!`);
        browserHistory.push('/posts');
      }
    });
  };
}
