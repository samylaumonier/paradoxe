import { Accounts } from 'meteor/accounts-base';

export const verifyUser = (nextState, replace) => {
  console.log('token:', nextState.params.token);
  Accounts.verifyEmail(nextState.params.token, err => {
    if (err) {
      
    } else {
      
      
    }
  });
  replace({
    pathname: '/posts',
    state: {
      nextPathname: nextState.location.pathname
    }
  });
};
