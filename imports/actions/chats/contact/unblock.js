export function unblockContact(contact) {
  return () => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to unblock this contact?\n If you unblock this contact, you will get ' +
        'notifications from them and they will see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, unblock contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('unblockContact', contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          toastr.success('Contact unblocked!');
        }
      });
    });
  };
}
