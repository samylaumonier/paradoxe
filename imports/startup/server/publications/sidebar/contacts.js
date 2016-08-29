import { Meteor } from 'meteor/meteor';
import { userHasBlockedContact } from '/imports/api/collections';

Meteor.publish('sidebar.contacts', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    // Selector
    const currentUser = Meteor.users.findOne(this.userId);
    let ids = [];

    if (currentUser.profile && currentUser.profile.contacts) {
      ids = currentUser.profile.contacts;
    }

    ids.push(this.userId);

    const selector = {
      _id: {
        $in: ids
      }
    };

    // Options
    const options = {
      fields: {
        username: 1,
        'profile.emailHash': 1,
        'profile.blockedContacts': 1,
        'status.online': 1,
        'status.idle': 1
      }
    };

    // Cursor
    const cursor = Meteor.users.find(selector, options).observe({
      added: user => {
        this.added('users', user._id, transformUser(currentUser, user));
      },
      changed: user => {
        this.changed('users', user._id, transformUser(currentUser, user));
      },
      removed: user => {
        this.removed('users', user._id);
      }
    });

    // Publish
    this.ready();

    this.onStop(function() {
      cursor.stop();
    });
  });
});

function transformUser(currentUser, user) {
  if (currentUser && userHasBlockedContact(user, currentUser._id)) {
    user.status.online = false;
    user.status.idle = false;
  }

  delete user.profile.blockedContacts;

  return user;
}
