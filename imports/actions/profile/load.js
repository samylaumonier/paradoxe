import { Meteor } from 'meteor/meteor';

export const PROFILE_SUBSCRIPTION = 'PROFILE_SUBSCRIPTION';
export const PROFILE_SUBSCRIPTION_READY = 'PROFILE_SUBSCRIPTION_READY';
export const PROFILE_SUBSCRIPTION_CHANGED = 'PROFILE_SUBSCRIPTION_CHANGED';

export function loadProfile(username) {
  return (dispatch, getState) => {
    dispatch({
      type: PROFILE_SUBSCRIPTION,
      meteor: {
        subscribe: () => {
          return Meteor.subscribe('profile.user', username);
        },
        get: () => {
          return Meteor.users.findOne({ username: username });
        },
        onReadyData: () => ({
          username,
        }),
      },
    });
  };
}
