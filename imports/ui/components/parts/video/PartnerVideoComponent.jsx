import React from 'react';
import { getUserStatus } from '/imports/api/collections/users';

export const PartnerVideoComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    stream: React.PropTypes.object.isRequired,
  },
  shouldComponentUpdate: function (nextProps) {
    return this.props.stream.id !== nextProps.stream.id;
  },
  render: function () {
    return (
      <div className="chat-sidebar-avatar top" key={this.props.stream.id}>
        <video
          ref="video"
          className={"avatar-image " + getUserStatus(this.props.user.status)}
          src={URL.createObjectURL(this.props.stream)}
          autoPlay
        />
      </div>
    );
  }
});

