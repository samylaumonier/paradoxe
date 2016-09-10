import { Meteor } from 'meteor/meteor';

export const requireGuestHook = (nextState, replace) => {
  if (Meteor.userId()) {
    replace({
      pathname: '/',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
