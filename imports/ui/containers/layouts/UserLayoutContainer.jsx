import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { connect } from 'react-redux';

import { initUser } from '/imports/actions/users/init';

import { UserLayoutComponent } from '/imports/ui/components/layouts/UserLayoutComponent';

function composer(props, onData) {
  const user = Meteor.user();

  if (user) {
    onData(null, {
      user,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInit: user => {
      dispatch(initUser(user));
    }
  };
};

export const UserLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(composeWithTracker(composer)(UserLayoutComponent));
