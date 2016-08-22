import React from 'react';

export const HangUpComponent = React.createClass({
  render: function () {
    return (
      <div id="hangupzone" className="row-fluid">
        <button className="btn btn-danger hangupaction span12" type="button" onClick={this.onHangUp}>
          <i className="fa fa-phone" />
          hang up
        </button>
      </div>
    );
  },
  onHangUp: function (event) {
    event.preventDefault();
    this.props.videoPeer.hangup();
    return false;
  }
});
