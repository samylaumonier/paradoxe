export const FILTER_GROUPS = 'FILTER_GROUPS';

export function filterGroups(filter) {
  return {
    type: FILTER_GROUPS,
    filter,
  };
}
