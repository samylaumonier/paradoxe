import { Meteor } from 'meteor/meteor';

import { Feedbacks } from '/imports/api/collections/feedback';

Meteor.methods({
  feedback: function (feedbackAttributes) {
    const user = Meteor.user();
    
    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }
  
    console.log('feedback:', feedbackAttributes);
    
    Feedbacks.insert()
  },
});

