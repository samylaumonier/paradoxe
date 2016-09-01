export const INIT_USER = 'INIT_USER';

export function initUser(user) {
  return {
    type: INIT_USER,
    user,
  };
}
