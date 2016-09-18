export function sendNudge(contact) {
  return () => {
    Meteor.call('sendNudge', contact._id, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });
  };
}
