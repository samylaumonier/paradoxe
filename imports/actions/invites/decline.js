import { Invites } from '/imports/api/collections/invites';

export function declineInvite(inviteId) {
  return () => {
    Invites.remove(inviteId);
  };
}
