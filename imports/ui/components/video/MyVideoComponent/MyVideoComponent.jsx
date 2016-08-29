import React from 'react';
import { getUserStatus } from '/imports/api/collections/users';

export const MyVideoComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    startUserVideo: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.props.startUserVideo();
  },
  render: function () {
    return (
      <div className="chat-sidebar-avatar bottom" >
        <video id="my-video" className={"avatar-image " + getUserStatus(this.props.user.status)} muted autoPlay />
      </div>
    );
  }
});
