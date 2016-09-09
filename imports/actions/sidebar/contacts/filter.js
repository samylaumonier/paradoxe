export const FILTER_CONTACTS = 'FILTER_CONTACTS';

export function filterContacts(filter) {
  return {
    type: FILTER_CONTACTS,
    filter,
  };
}
