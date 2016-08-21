import { Template } from 'meteor/templating';

import '/client/ui/components/callzone.html';
import '/client/ui/components/hangup.html';


var orovideo = new OroVideoPeer();
orovideo.run();

Template.callzone.events({
  'click .callaction' : function(e, t) {
    e.preventDefault();
    var key = t.find('.callkey').value;
    orovideo.callAKey(key);
    return false;
  }
});

Template.hangup.events({
  'click .hangupaction' : function(e, t) {
    e.preventDefault();
    orovideo.hangup();
    return false;
  }
});