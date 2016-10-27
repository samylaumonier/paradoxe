import React from 'react';

import { ProfilePictureContainer } from '/imports/ui/containers/parts/profile/ProfilePictureContainer.jsx';
import { NotFoundPageComponent } from '/imports/ui/components/pages/NotFoundPageComponent';
import { SpinnerComponent } from '/imports/ui/components/parts/app/spinner/SpinnerComponent';

export const ProfilePageComponent = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    loadProfile: React.PropTypes.func.isRequired,
    ready: React.PropTypes.bool.isRequired,
    
  },
  componentWillMount: function () {
    this.props.loadProfile();
  },
  render: function () {
    if (!this.props.ready) {
      return (
        <SpinnerComponent />
      );
    }
  
    return this.props.user
      ? <div>
        {this.props.user.username}
      </div>
      : <NotFoundPageComponent />;
  },
});
