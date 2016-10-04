/* eslint no-console: [2, { allow: ["error"] }] */
import { Meteor } from 'meteor/meteor';
import launchApp from './launchApp';
import createBinaries from './createBinaries';

console.log('env is', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  console.log('start build');
  const settings = Meteor.settings.electronBuilder || {};

  // Promise is returned
  createBinaries
    .then(packageJSON => {
      if (packageJSON && settings.autoRun) launchApp(packageJSON);
    })
    .catch(err => console.error(err));
}
