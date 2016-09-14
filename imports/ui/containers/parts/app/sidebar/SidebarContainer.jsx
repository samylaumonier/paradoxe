import { connect } from 'react-redux';

import { getUserStatus } from '/imports/api/collections/users';

import { loadContacts } from '/imports/actions/sidebar/contacts/load';
import { filterContacts } from '/imports/actions/sidebar/contacts/filter';

import { SidebarComponent } from '/imports/ui/components/parts/app/sidebar/SidebarComponent/SidebarComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
    userStatus: getUserStatus(state.user.status),
    contacts: state.sidebar.contactsFilter.length
      ? state.sidebar.contacts.filter(contact => contact.username.includes(state.sidebar.contactsFilter))
      : state.sidebar.contacts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadContacts: () => {
      dispatch(loadContacts());
    },
    onFilterContacts: filter => {
      dispatch(filterContacts(filter));
    },
  };
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
