export const DELETE_CALL_STATE = 'DELETE_CALL_STATE';

export function deleteCallState(contactUsername) {
  return {
    type: DELETE_CALL_STATE,
    contactUsername
  };
}
