import { connect } from 'react-redux';

import { change } from '/imports/actions/user/change';

import { ChangePasswordPageComponent } from '/imports/ui/components/parts/user/ChangePasswordComponent';

const mapStateToProps = () => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change: (oldPassword, newPassword, callback) => {
      dispatch(change(oldPassword, newPassword, callback));
    }
  };
};

export const ChangePasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordPageComponent);
