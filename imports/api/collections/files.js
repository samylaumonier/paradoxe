import { FilesCollection } from 'meteor/ostrio:files';

/** @namespace Meteor.settings.public.filesPath */
export const Files = new FilesCollection({
  storagePath: `${process.env.PWD}/${Meteor.settings.public.filesPath}`,
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from client
  onBeforeUpload: file => {
    // Allow upload files under 10MB
    if (file.size <= 2147483648) {
      return true;
    } else {
      return 'Please upload file with size equal or less than 10MB.';
    }
  }
});
