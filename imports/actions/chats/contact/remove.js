import { browserHistory } from 'react-router';

export function removeContact(contact) {
  return () => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this contact?\n If you delete this contact, they will be removed from ' +
        'your contact list and you will no longer be able to send them messages.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('removeContact', contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          browserHistory.push('/posts');
          toastr.success(`${contact.username} has been deleted!`);
        }
      });
    });
  };
}
