import React from 'react';
import { If, Else, Then } from 'react-if';
import { Link } from 'react-router';

import { getUserStatus } from '/imports/api/collections/users';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';
import { SidebarContactItemComponent } from '/imports/ui/components/parts/app/sidebar/SidebarContactItemComponent/SidebarContactItemComponent';

import './SidebarComponentStyle.less';

export const SidebarComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contacts: React.PropTypes.array.isRequired,
    loadContacts: React.PropTypes.func.isRequired,
    onFilterContacts: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadContacts();
  },
  render: function () {
    return (
      <div id="sidebar" className="ui vertical inverted left visible sidebar menu">
        <div className="item">
          <Link className="ui logo icon image" to="/">
            <img src="/images/logo.png"/>
          </Link>
          <Link to="/"><b>Epsilon</b></Link>
        </div>
        <div className="item">
          <div className="ui middle aligned selection inverted relaxed divided list">
            <div className="item">
              <span className={"user-status-header mini ui empty circular label " + getUserStatus(this.props.user.status)}/>
              <AvatarComponent user={this.props.user} className={"ui avatar image"} size={28}/>
              <div className="content">
                <div className="header">{this.props.user.username}</div>
              </div>
            </div>
          </div>
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
          <If condition={this.props.contacts.length !== 0}>
            <Then>
              <div className="ui mini middle aligned selection inverted relaxed divided list">
                {this.props.contacts.map(contact =>
                  <SidebarContactItemComponent
                    key={contact._id}
                    user={this.props.user}
                    contact={contact}
                  />
                )}
              </div>
            </Then>
            <Else>
              <div className="no-contacts">No contact found!</div>
            </Else>
          </If>
        </div>
      </div>
    );
  },
});
