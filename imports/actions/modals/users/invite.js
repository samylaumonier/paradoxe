import { Meteor } from 'meteor/meteor';

export function inviteUsers(usernames) {
  return () => {
    Meteor.call('inviteUsers', usernames, (err, res) => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success(`${res} invitation(s) sent`, 'Invitation(s) sent');
      }
    });
  };
}
