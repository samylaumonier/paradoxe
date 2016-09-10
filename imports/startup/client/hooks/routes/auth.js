import { Meteor } from 'meteor/meteor';

export const requireAuthHook = function (nextState, replace) {
  if (!Meteor.userId()) {
    replace({
      pathname: '/connect',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
