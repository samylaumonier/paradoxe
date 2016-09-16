import React from 'react';

import { ProfilePictureContainer } from '/imports/ui/containers/parts/profile/ProfilePictureContainer.jsx';

export const ProfilePageComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  
  render: function () {
    return (
      <ProfilePictureContainer
        user={this.props.user}
      />
    );
  },
});
