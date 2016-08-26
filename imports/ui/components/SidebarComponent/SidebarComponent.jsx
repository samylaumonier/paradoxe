import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { Link } from 'react-router';

import { SidebarContactItemComponent } from '../SidebarContactItemComponent/SidebarContactItemComponent';
import { SidebarContactAddComponent } from '../SidebarContactAddComponent/SidebarContactAddComponent';

import './SidebarComponentStyle.less';

const sidebar = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array
  },
  componentDidMount: function () {
    $('#contact-add-modal').modal({
      context: '#modals',
      closable: false,
      onApprove: () => {
        const dropdown = $('#contact-add-modal').find('select');
        const usernames = dropdown.val() || [];

        dropdown.dropdown('clear');

        Meteor.call('inviteUsers', usernames, (err, res) => {
          if (err) {
            toastr.error(err.reason, 'Error');
          } else {
            toastr.success(`${res} invitation(s) sent`, 'Invitation(s) sent');
          }
        });
      }
    });
  },
  render: function () {
    return (
      <div className="ui vertical inverted left visible sidebar menu">
        <div className="item">
          <Link className="ui logo icon image" to="/">
            <img src="http://semantic-ui.com/images/logo.png" />
          </Link>
          <Link to="/"><b>Epsilon</b></Link>
        </div>
        <div className="item">
          <div className="header">
            Contacts
            <i id="add-contact-button" className="link add icon" onClick={this.openContactAddModal} />
            <SidebarContactAddComponent />
          </div>
          <div className="ui fluid inverted transparent icon input">
            <input placeholder="Search..." type="text" />
            <i className="search icon" />
          </div>
          <div className="ui mini middle aligned selection inverted relaxed divided list">
            {this.props.contacts.map(contact => <SidebarContactItemComponent key={contact._id} contact={contact} />)}
          </div>
        </div>
      </div>
    );
  },
  openContactAddModal: function () {
    $('#contact-add-modal').modal('show');
  }
});

function composer(props, onData) {
  const subscription = Meteor.subscribe('sidebar.contacts');

  if (subscription.ready()) {
    const user = Meteor.user();
    let contacts = [];

    if (user) {
      const ids = user.profile ? user.profile.contacts : null;

      if (ids) {
        contacts = Meteor.users.find({
          _id: {
            $in: ids
          }
        }).fetch();
      }
    }

    onData(null, {
      contacts
    });
  }
}

export const SidebarComponent = composeWithTracker(composer)(sidebar);
