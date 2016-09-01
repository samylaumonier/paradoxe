import React from 'react';
import { If, Then, Else } from 'react-if';
import { browserHistory } from 'react-router';

export const ChatNavbarComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    currentCall: React.PropTypes.bool.isRequired,
    startVideoCall: React.PropTypes.func.isRequired,
    stopVideoCall: React.PropTypes.func.isRequired,
    userHasBlockedContact: React.PropTypes.bool.isRequired,
  },
  componentDidMount: function () {
    this.initTooltips();
  },
  componentDidUpdate: function () {
    this.initTooltips();
  },
  render: function () {
    return (
      <div className="ui top attached menu" ref="navbar">
        <a className="ui icon item">
          <i className="file icon"/>
        </a>
        <a className="ui icon item">
          <i className="game icon"/>
        </a>
        <a className="ui icon item">
          <i className="phone icon"/>
        </a>
        <If condition={this.props.currentCall}>
          <Then>
            <a className="ui icon item" data-content="Stop video call" onClick={this.stopVideoCall}>
              <i className="icons">
                <i className="record icon"/>
                <i className="red corner remove icon"/>
              </i>
            </a>
          </Then>
          <Else>
            <a className="ui icon item" data-content="Start video call" onClick={this.startVideoCall}>
              <i className="record icon"/>
            </a>
          </Else>
        </If>
        <a className="ui icon item">
          <i className="gift icon"/>
        </a>
        <If condition={this.props.userHasBlockedContact}>
          <Then>
            <a className="ui icon item" data-content="Unblock" onClick={this.unblockContact}>
              <i className="icons">
                <i className="user icon"/>
                <i className="green corner dont icon"/>
              </i>
            </a>
          </Then>
          <Else>
            <a className="ui icon item" data-content="Block" onClick={this.blockContact}>
              <i className="icons">
                <i className="user icon"/>
                <i className="red corner dont icon"/>
              </i>
            </a>
          </Else>
        </If>
        <a className="ui icon item" data-content="Remove" onClick={this.removeContact}>
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner remove icon"/>
          </i>
        </a>
      </div>
    );
  },
  initTooltips: function () {
    $(this.refs.navbar).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'bottom center'
    });
  },
  startVideoCall: function () {
    this.props.startVideoCall();
  },
  stopVideoCall: function () {
    this.props.stopVideoCall();
  },
  removeContact: function () {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this contact?\n If you delete this contact, they will be removed from ' +
        'your contact list and you will no longer be able to send them messages.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('removeContact', this.props.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          browserHistory.push('/');
          toastr.success(`${this.props.contact.username} has been deleted!`);
        }
      });
    });
  },
  blockContact: function () {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to block this contact?\n If you block this contact, you will no longer get ' +
        'notifications from them and they will no longer see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, block contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('blockContact', this.props.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          toastr.success(`${this.props.contact.username} has been blocked!`);
        }
      });
    });
  },
  unblockContact: function () {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to unblock this contact?\n If you unblock this contact, you will get ' +
        'notifications from them and they will see you online.',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, unblock contact!',
      confirmButtonColor: '#ec6c62'
    }, () => {
      Meteor.call('unblockContact', this.props.contact._id, err => {
        if (err) {
          toastr.error(err.reason, 'Error');
        } else {
          toastr.success('Contact unblocked!');
        }
      });
    });
  },
});
