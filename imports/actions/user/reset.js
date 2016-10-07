import { browserHistory } from 'react-router';

import Notifications from 'react-notification-system-redux';

export function reset(password, token) {
  return dispatch => {
    try {
      Accounts.resetPassword(token, password, err => {
        if (err) {
          dispatch(
            Notifications.error({
              title: `An error occurred`,
              message: err.reason,
              position: 'tr',
              autoDismiss: 5,
              dismissible: true
            })
          );
        }
        else {
          browserHistory.push('/posts');
        }
      });
    } catch (err){
      console.log('Reset password mail error:', err);
    }
  };
}

