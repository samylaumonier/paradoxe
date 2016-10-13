import { Meteor } from 'meteor/meteor';
import numeral from 'numeral';
import { FilesCollection } from 'meteor/ostrio:files';

/** @namespace Meteor.settings.public.filesPath */
/** @namespace Meteor.settings.public.uploadMaxFileSize */
export const Files = new FilesCollection({
  storagePath: `${process.env.PWD}/${Meteor.settings.public.filesPath}`,
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from client
  onBeforeUpload: file => {
    if (file.size <= Meteor.settings.public.uploadMaxFileSize) {
      if (file.meta.profilePicture && !/png|jpg|jpeg|gif/i.test(file.extension)) {
        return `Please select an image (.png, .jpg, .jpeg or .gif).`;
      }

      return true;
    } else {
      const max = numeral(Meteor.settings.public.uploadMaxFileSize).format('0.00 b');
      return `Please upload file with size equal to or less than ${max}.`;
    }
  }
});

export const FileSchema = new SimpleSchema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  size: {
    type: Number,
  },
  status: {
    type: Number,
  },
  progress: {
    type: Number,
    optional: true,
  },
});

export function fileListToArray(list) {
  const files = [];

  for (let i = 0; i < list.length; i++) {
    files.push(list[i]);
  }

  return files;
}
