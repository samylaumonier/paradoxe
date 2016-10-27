import React from 'react';
import { Link } from 'react-router';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';
import { SidebarContactItemContainer } from '/imports/ui/containers/parts/app/sidebar/SidebarContactItemContainer';

import '/imports/ui/styles/parts/app/sidebar/SidebarComponentStyle.less';

export const SidebarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    userStatus: React.PropTypes.string.isRequired,
    contacts: React.PropTypes.array.isRequired,
    loadContacts: React.PropTypes.func.isRequired,
    loadMessages: React.PropTypes.func.isRequired,
    onFilterContacts: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadContacts();
    this.props.loadMessages();
  },
  render: function () {

    const contacts = this.props.contacts.length
      ? <div className="ui mini middle aligned selection inverted relaxed divided list">
        {this.props.contacts.map(contact => <SidebarContactItemContainer key={contact._id} contact={contact}/>)}
      </div>
      : <div className="no-contacts">No contact found!</div>;
  
    
    return (
      <div id="sidebar" className={`ui vertical inverted left sidebar secondary menu ${this.visible()}`}>
        <Link className="item ui middle aligned selection inverted relaxed divided list" to="/posts"  onClick={this.toggleSidebar}>
          <i className="home icon"/>
          Home
        </Link>
        <div className="item">
          <Link className="ui middle aligned selection inverted relaxed divided list" to={`/profile/${this.props.user.username}`}  onClick={this.toggleSidebar}>
            <div className="item">
              <span className={`user-status-header mini ui empty circular label ${this.props.userStatus}`}/>
              <AvatarComponent user={this.props.user} className={"ui avatar image"} size={28}/>
              <div className="content">
                <div className="header">{this.props.user.username}</div>
              </div>
            </div>
          </Link>
          <div className="ui inverted horizontal divider header">
            <i className="users icon"/>
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
        </div>
      </div>
    );
  },
  visible: function () {
    if($(window).width() < 801) {
      return '';
    }else {
      return 'visible';
    }
  },
  toggleSidebar: function () {
    if($(window).width() < 801) {
      $('.ui.vertical.inverted.left.sidebar.secondary.menu').sidebar('toggle');
    }
  },
});
