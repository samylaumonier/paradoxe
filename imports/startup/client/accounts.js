import { browserHistory } from 'react-router';

Tracker.autorun(function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    browserHistory.push('/connect');
  }
});
