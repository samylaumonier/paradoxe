import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';

export function logout() {
  return dispatch => {
    Meteor.logout();
    dispatch(push('/connect'));
  };
}
