import { Meteor } from 'meteor/meteor';

Meteor.publish('profile.user', function (contactUsername) {
  
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
    
    const contact = Meteor.users.findOne({ username: contactUsername });

    if (contact) {
      return [
        Meteor.users.find({
          _id: contact._id
        }, {
          fields: {
            username: 1,
            'profile.emailHash': 1,
            'profile.pictureId': 1,
          }
        }),
      ];
    }

    return [];
  });
});
