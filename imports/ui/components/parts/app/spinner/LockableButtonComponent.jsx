import React from 'react';

export const LockableButtonComponent = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    className: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    onClick: React.PropTypes.func,
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
      <button type={this.props.type || 'button'} className={className} onClick={this.onClick}>
        {this.props.children}
      </button>
    );
  },
  onClick: function () {
    if (this.props.onClick) {
      this.props.onClick(this);
    }
  },
});
