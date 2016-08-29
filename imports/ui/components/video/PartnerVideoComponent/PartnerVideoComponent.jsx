import React from 'react';
import { getUserStatus } from '/imports/api/collections/users';

export const PartnerVideoComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    startPartnerVideo: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.props.startPartnerVideo();
  },
  render: function () {
    return (
      <div className="chat-sidebar-avatar top" >
        <video id="partner-video" className={"avatar-image " + getUserStatus(this.props.user.status)} muted autoPlay />
      </div>
    );
  }
});

