/* eslint no-console: [2, { allow: ["error"] }] */
import { Meteor } from 'meteor/meteor';
import launchApp from './launchApp';
import createBinaries from './createBinaries';

if (process.env.NODE_ENV === 'development') {
  const settings = Meteor.settings.electronBuilder || {};

  new Promise(createBinaries)
    .then(packageJSON => {
      if (packageJSON && settings.autoRun) launchApp(packageJSON);
    })
    .catch(err => console.error(err));
}
