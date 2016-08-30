import React from 'react';
import { getUserStatus } from '/imports/api/collections/users';

export const PartnerVideoComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    call: React.PropTypes.object,
  },
  componentDidMount: function () {
    this.props.call.on('stream', stream => {
      $(this.refs.video).prop('src', URL.createObjectURL(stream));
    });
  },
  render: function () {
    return (
      <div className="chat-sidebar-avatar top" >
        <video
          ref="video"
          className={"avatar-image " + getUserStatus(this.props.user.status)}
          autoPlay
        />
      </div>
    );
  }
});

