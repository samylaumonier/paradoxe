import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then } from 'react-if';
import { Link } from 'react-router';

import './NavbarComponentStyle.less';

const navbar = React.createClass({
  componentDidMount: function () {
    $(this.refs.profile).dropdown();
  },
  render: function () {
    return (
      <div className="ui top attached menu">
        <div ref="profile" className="ui dropdown icon item">
          <i className="user icon"/>
          <div className="menu">
            <div className="item">Help</div>
            <div className="item">Settings</div>
            <div className="item" onClick={this.logout}>
              Logout
            </div>
          </div>
        </div>
        <span className="ui icon item" onClick={this.openContactAddModal}>
          <i className="add user icon"/>
          &nbsp; Add contacts
        </span>
        <Link className="ui icon item" to="/invites">
          <i className="users icon"/>
          &nbsp; Invites
          <If condition={this.props.hasInvites}>
            <Then>
              <span className="ui mini green circular label navbar-label">
                {this.props.invites}
              </span>
            </Then>
          </If>
        </Link>
        <div className="right menu">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input className="prompt" placeholder="Search..." type="text"/>
              <i className="search link icon"/>
            </div>
            <div className="results"></div>
          </div>
        </div>
      </div>
    );
  },
  openContactAddModal: function () {
    $('#contact-add-modal').modal('show');
  },
  logout: function () {
    Meteor.logout();
  }
});

function composer(props, onData) {
  const subscription = Meteor.subscribe('navbar.invites');
  
  if (subscription.ready()) {
    if (Counts.has('navbar.invites')) {
      const invites = Counts.get('navbar.invites');
      
      onData(null, {
        hasInvites: invites > 0,
        invites
      });
    }
  }
}

export const NavbarComponent = composeWithTracker(composer)(navbar);
