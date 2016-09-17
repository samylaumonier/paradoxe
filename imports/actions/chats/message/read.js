export function readMessage(messageId) {
  return () => {
    Meteor.call('readMessage', messageId);
  };
}
