import { Meteor } from 'meteor/meteor';

export const requireAuthHook = function (nextState, replace) {
  if (!Meteor.userId()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
