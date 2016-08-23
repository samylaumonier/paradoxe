import { browserHistory } from 'react-router';

Tracker.autorun(function(){
  if(!Meteor.user()){
    browserHistory.push('/connect');
  }
});
