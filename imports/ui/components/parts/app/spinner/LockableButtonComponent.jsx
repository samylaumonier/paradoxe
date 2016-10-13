import React from 'react';

export const LockableButtonComponent = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
  },
  getInitialState: function () {
    return {
      locked: false,
    };
  },
  lock: function () {
    this.setState({
      locked: true,
    });
  },
  unlock: function () {
    this.setState({
      locked: false,
    });
  },
  isLocked: function () {
    return this.state.locked;
  },
  render: function () {
    let className = this.props.className;

    if (this.state.locked) {
      className += ' disabled loading';
    }

    return (
      <button type={this.props.type} className={className}>
        {this.props.children}
      </button>
    );
  }
});
