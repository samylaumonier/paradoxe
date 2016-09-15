export const CHAT_FILES_DROPPED = 'CHAT_FILES_DROPPED';

export function filesDropped(contact, files) {
  const filesInfo = [];

  files.forEach(file => {
    if (!file.id) {
      file.id = Random.id(8);
    }

    filesInfo.push({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
    });
  });

  Meteor.call('uploadFile', filesInfo, contact._id, err => {
    if (err) {
      toastr.error(err.reason, 'Error');
    }
  });

  return {
    type: CHAT_FILES_DROPPED,
    contact,
    files,
  };
}
