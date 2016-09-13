import { DECLINED_STATUS } from '/imports/api/collections/messages';

export function declineVideoCall(message) {
  return () => {
    Meteor.call('updateVideoCallStatus', message._id, DECLINED_STATUS);
  };
}
