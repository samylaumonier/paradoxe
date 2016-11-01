import React from 'react';
import { Link } from 'react-router';

import { toggleSidebar } from '/imports/api/sidebar/toggle';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';
import { SidebarContactItemContainer } from '/imports/ui/containers/parts/app/sidebar/SidebarContactItemContainer';
import { SidebarGroupItemContainer } from '/imports/ui/containers/parts/app/sidebar/SidebarGroupItemContainer';

import '/imports/ui/styles/parts/app/sidebar/SidebarComponentStyle.less';

export const SidebarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    userStatus: React.PropTypes.string.isRequired,
    contacts: React.PropTypes.array.isRequired,
    groups: React.PropTypes.array.isRequired,
    loadContacts: React.PropTypes.func.isRequired,
    loadMessages: React.PropTypes.func.isRequired,
    loadGroups: React.PropTypes.func.isRequired,
    onFilterContacts: React.PropTypes.func.isRequired,
    onFilterGroups: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadContacts();
    this.props.loadMessages();
    this.props.loadGroups();
  },
  render: function () {
    const contacts = this.props.contacts.length
      ? <div className="ui mini middle aligned selection inverted relaxed divided list">
      {this.props.contacts.map(contact => <SidebarContactItemContainer key={contact._id} contact={contact}/>)}
    </div>
      : <div className="no-contacts">No contact found!</div>;

    const groups = this.props.groups.length
      ? <div className="ui mini middle aligned selection inverted relaxed divided list">
      {this.props.groups.map(group => <SidebarGroupItemContainer key={group._id} group={group}/>)}
    </div>
      : <div className="no-groups">No groups found!</div>;

    return (
      <div id="sidebar" className={`ui vertical inverted left sidebar secondary menu ${this.visible()}`}>
        <Link id="home-sidebar-link" className="item ui middle aligned selection inverted relaxed divided list" to="/posts" onClick={toggleSidebar}>
          <i className="home icon"/>
          Home
        </Link>
        <div className="item">
          <Link className="ui middle aligned selection inverted relaxed divided list" to={`/settings`} onClick={toggleSidebar}>
            <div className="item">
              <span className={`user-status-header mini ui empty circular label ${this.props.userStatus}`}/>
              <AvatarComponent user={this.props.user} className={"ui avatar image"} size={28}/>
              <div className="content">
                <div className="header">{this.props.user.username}</div>
              </div>
            </div>
          </Link>
          <div className="ui inverted horizontal divider header">
            <i className="user icon"/>
            Contacts
          </div>
          <div className="ui fluid inverted transparent icon input">
            <input
              placeholder="Search..."
              type="text"
              onChange={event => this.props.onFilterContacts(event.target.value)}
            />
            <i className="search icon"/>
          </div>
          {contacts}
          <div className="ui inverted horizontal divider header">
            <i className="users icon"/>
            Groups
          </div>
          <div className="ui fluid inverted transparent icon input">
            <input
              placeholder="Search..."
              type="text"
              onChange={event => this.props.onFilterGroups(event.target.value)}
            />
            <i className="search icon"/>
          </div>
          {groups}
        </div>
      </div>
    );
  },
  visible: function () {
    return $(window).width() < 801 ? '' : 'visible';
  },
});
