import React from 'react';

export const CallZoneComponent = React.createClass({
  getInitialState: () => ({
    callKey: ''
  }),
  handleChange: function (event) {
    this.setState({
      callKey: event.target.value
    });
  },
  render: function ()  {
    return (
      <div id="callzone" className="row-fluid">
        <input
          type="text"
          className="callkey span8 pull-left"
          placeholder="Key of a friend..."
          value={this.state.callKey}
          onChange={this.handleChange}
        />
        <button className="btn btn-success callaction span4 pull-right" type="button" onClick={this.onCall}>
          <i className="fa fa-phone" />
          <span className="callword">call</span>
        </button>
      </div>
    );
  },
  onCall: function (event) {
    event.preventDefault();
    this.props.videoPeer.callAKey(this.state.callKey);
    return false;
  }
});
