import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

/** @namespace Meteor.settings.public.filesPath */
/** @namespace Meteor.settings.public.uploadMaxFileSize */
export const Files = new FilesCollection({
  storagePath: `${process.env.PWD}/${Meteor.settings.public.filesPath}`,
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from client
  onBeforeUpload: file => {
    console.log(file.size);
    // Allow upload files under 2 GB
    if (file.size <= Meteor.settings.public.uploadMaxFileSize) {
      return true;
    } else {
      return 'Please upload file with size equal to or less than 10MB.';
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
