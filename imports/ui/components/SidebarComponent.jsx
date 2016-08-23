import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import { SidebarContactItemComponent } from './SidebarContactItemComponent';

import './SidebarComponentStyle.less';

const sidebar = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array
  },
  render: function () {
    return (
      <div className="ui vertical inverted visible sidebar menu">
        <div className="item">
          <a className="ui logo icon image" href="/">
            <img src="http://semantic-ui.com/images/logo.png" />
          </a>
          <a href="/"><b>Epsilon</b></a>
        </div>
        <div className="item">
          <div className="header">
            Contacts
            <span className="right floated">
          <i className="add link icon" />
        </span>
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
  }
});

export const SidebarComponent = createContainer(() => {
  Meteor.subscribe('sidebar.contacts');

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

  return {
    contacts
  };
}, sidebar);
