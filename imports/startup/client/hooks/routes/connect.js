export const isAuthHook = function (nextState, replace) {
  if (Meteor.userId()) {
    replace({
      pathname: '/',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
