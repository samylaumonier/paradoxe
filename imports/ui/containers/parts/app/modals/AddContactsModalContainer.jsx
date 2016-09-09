import { connect } from 'react-redux';

import { inviteUsers } from '/imports/actions/modals/users/invite';

import { AddContactsModalComponent } from '/imports/ui/components/parts/app/modals/AddContactsModalComponent/AddContactsModalComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
    loginToken: localStorage.getItem('Meteor.loginToken'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inviteUsers: usernames => {
      dispatch(inviteUsers(usernames));
    },
  };
};

export const AddContactsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactsModalComponent);
