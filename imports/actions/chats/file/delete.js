export function deleteFile(message, localFileId) {
  return () => {
    Meteor.call('deleteFile', message._id, localFileId, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      } else {
        toastr.success('File deleted.');
      }
    });
  }
}
