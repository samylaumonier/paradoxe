import { Meteor } from 'meteor/meteor';

import { Files } from '/imports/api/collections/files';
import { userHasBlockedContact } from '/imports/api/collections/users';

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
        'profile.pictureId': 1,
        'profile.blockedContacts': 1,
        'status.online': 1,
        'status.idle': 1
      }
    };

    // Cursor
    const usersCursor = Meteor.users.find(selector, options);
    const usersObservable = usersCursor.observe({
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

    // Profile pictures
    const filesCursor = Files.find({
      _id: {
        $in: _.compact(_.map(usersCursor.fetch(), user => user.profile.pictureId)),
      },
    }).cursor;

    const filesObservable = filesCursor.observe({
      added: file => {
        this.added('files', file._id, file);
      },
      changed: file => {
        this.changed('files', file._id, file);
      },
      removed: file => {
        this.removed('files', file._id);
      }
    });

    // Publish
    this.ready();

    this.onStop(function() {
      usersObservable.stop();
      filesObservable.stop();
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
