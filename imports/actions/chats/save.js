export const SAVE_CALL_STATE = 'SAVE_CALL_STATE';

export function saveCallState(contactUsername, callState) {
  return {
    type: SAVE_CALL_STATE,
    contactUsername,
    callState,
  };
}
