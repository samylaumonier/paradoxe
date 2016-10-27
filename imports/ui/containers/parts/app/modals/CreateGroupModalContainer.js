import { connect } from 'react-redux';

import { createGroup } from '/imports/actions/modals/groups/create';

import { CreateGroupModalComponent } from '/imports/ui/components/parts/app/modals/CreateGroupModalComponent';

const mapStateToProps = state => {
  return {
    user: state.user,
    loginToken: localStorage.getItem('Meteor.loginToken'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (values, unlock) => {
      dispatch(createGroup(values, unlock));
    },
  };
};

export const CreateGroupModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupModalComponent);
