import { Meteor } from 'meteor/meteor';
import { Electron } from 'meteor/risetechnologies:electron-builder';

export const requireGuestHook = (nextState, replace) => {
  if (Electron.isElectron() && window.location.pathname === '/' || Meteor.userId()) {
    replace({
      pathname: '/posts',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
