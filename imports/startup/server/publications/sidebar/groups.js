import { Meteor } from 'meteor/meteor';

import { Groups } from '/imports/api/collections/groups';
import { Files } from '/imports/api/collections/files';

Meteor.publish('sidebar.groups', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }

    const groups = Groups.find({
      users: {
        $in: [this.userId],
      },
    });

    return [
      groups,
      Files.find({
        _id: {
          $in: _.compact(_.pluck(groups.fetch(), 'pictureId')),
        },
      }).cursor,
    ];
  });
});
