import { Accounts } from 'meteor/accounts-base';

export const verifyUser = (nextState, replace) => {
  Accounts.verifyEmail(nextState.params.token, err => {
    if (err) {
      // TODO: display error?
      console.log(err);
    }
  });

  replace({
    pathname: '/posts',
    state: {
      nextPathname: nextState.location.pathname
    }
  });
};
