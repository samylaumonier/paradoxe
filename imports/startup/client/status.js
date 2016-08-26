import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

Meteor.startup(() => {
  Tracker.autorun(c => {
    try {
      UserStatus.startMonitor({
        threshold: 1000 * 60 * 5,
        interval: 1000 * 5,
        idleOnBlur: false
      });
      c.stop();
    } catch (e) {
      
    }
  });
});
