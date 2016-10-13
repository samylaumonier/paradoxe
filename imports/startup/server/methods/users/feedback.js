import { Meteor } from 'meteor/meteor';

import escape from 'escape-html';

import { Feedbacks } from '/imports/api/collections/feedback';

Meteor.methods({
  feedback: function (feedbackAttributes) {
    const user = Meteor.user();
    
    if (!user) {
      throw new Meteor.Error('401', 'Not authorized.');
    }
  
    feedbackAttributes.subject = escape(feedbackAttributes.subject);
    feedbackAttributes.type = escape(feedbackAttributes.type);
    feedbackAttributes.description = escape(feedbackAttributes.description);
  
  
    if(feedbackAttributes.type != "bug" && feedbackAttributes.type != "enhancement" && feedbackAttributes.type != "design"){
      throw new Meteor.Error('401', "Please select one of the types given.");
    }
  
    var feedback = _.extend(_.pick(feedbackAttributes, 'subject', "type", 'description'), {
      userId: user._id,
      createdAt: new Date()
    });
  
    Feedbacks.insert(feedback);
  },
});

