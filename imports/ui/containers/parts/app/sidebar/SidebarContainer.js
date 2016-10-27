import { connect } from 'react-redux';

import { getUserStatus } from '/imports/api/collections/users';

import { loadContacts } from '/imports/actions/sidebar/contacts/load';
import { loadMessages } from '/imports/actions/sidebar/messages/load';
import { loadGroups } from '/imports/actions/sidebar/groups/load';
import { filterContacts } from '/imports/actions/sidebar/contacts/filter';
import { filterGroups } from '/imports/actions/sidebar/groups/filter';

import { SidebarComponent } from '/imports/ui/components/parts/app/sidebar/SidebarComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
    userStatus: getUserStatus(state.user.status),
    contacts: state.sidebar.contactsFilter.length
      ? state.sidebar.contacts.filter(contact => contact.username.includes(state.sidebar.contactsFilter))
      : state.sidebar.contacts,
    groups: state.sidebar.groupsFilter.length
      ? state.sidebar.groups.filter(group => group.name.includes(state.sidebar.groupsFilter))
      : state.sidebar.groups,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadContacts: () => {
      dispatch(loadContacts());
    },
    loadMessages: () => {
      dispatch(loadMessages());
    },
    loadGroups: () => {
      dispatch(loadGroups());
    },
    onFilterContacts: filter => {
      dispatch(filterContacts(filter));
    },
    onFilterGroups: filter => {
      dispatch(filterGroups(filter));
    },
  };
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
