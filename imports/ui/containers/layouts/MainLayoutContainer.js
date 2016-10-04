import { connect } from 'react-redux';

import { MainLayoutComponent } from '/imports/ui/components/layouts/MainLayoutComponent';

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = () => {
  return {
    
  };
};

export const MainLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayoutComponent);
