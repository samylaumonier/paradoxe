export function blockContact(contact) {
  return () => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to block this contact?\n If you block this contact, you will no longer get ' +
        'notifications from them and they will no longer see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, block contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('blockContact', contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          toastr.success(`${contact.username} has been blocked!`);
        }
      });
    });
  };
}
