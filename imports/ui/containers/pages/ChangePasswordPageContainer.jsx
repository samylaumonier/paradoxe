import { connect } from 'react-redux';

import { change } from '/imports/actions/user/change';

import { ChangePasswordPageComponent } from '/imports/ui/components/pages/ChangePasswordPageComponent';

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change: (oldPassword, newPassword) => {
      dispatch(change(oldPassword, newPassword));
    }
  };
};

export const ChangePasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordPageComponent);
