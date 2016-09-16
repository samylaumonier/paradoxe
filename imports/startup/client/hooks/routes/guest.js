import { Meteor } from 'meteor/meteor';

export const requireGuestHook = (nextState, replace) => {
  if (Meteor.userId()) {
    replace({
      pathname: '/posts',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
