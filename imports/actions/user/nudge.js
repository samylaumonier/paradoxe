import { Meteor } from 'meteor/meteor';

export function nudgeUser(nudgeMessages) {
  return () => {
    const body = $('body');
    const animation = 'animated shake';

    body.addClass(animation);

    setTimeout(() => {
      body.removeClass(animation);
    }, 1000);

    Meteor.call('userNudged', _.pluck(nudgeMessages, '_id'));
  };
}
