import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { toggleSidebar } from '/imports/api/sidebar/toggle';

import { SidebarGroupItemComponent } from '/imports/ui/components/parts/app/sidebar/SidebarGroupItemComponent';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    openChat: () => {
      browserHistory.push(`/group/${props.group._id}-${props.group.slug}`);
      toggleSidebar();
    },
  };
};

export const SidebarGroupItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarGroupItemComponent);
