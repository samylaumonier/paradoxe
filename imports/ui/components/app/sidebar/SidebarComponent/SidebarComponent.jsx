import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { Link } from 'react-router';

import { AvatarComponent } from '/imports/ui/components/user/AvatarComponent/AvatarComponent';
import { SidebarContactItemComponent } from '/imports/ui/components/app/sidebar/SidebarContactItemComponent/SidebarContactItemComponent';

import './SidebarComponentStyle.less';

const sidebar = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contacts: React.PropTypes.array.isRequired
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
              <span className={"user-status-header mini ui empty circular label " + this.userStatus(this.props.user.status)}/>
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
            <input placeholder="Search..." type="text"/>
            <i className="search icon"/>
          </div>
          <div className="ui mini middle aligned selection inverted relaxed divided list">
            {this.props.contacts.map(contact => <SidebarContactItemComponent key={contact._id} user={this.props.user} contact={contact}/>)}
          </div>
        </div>
      </div>
    );
  },
  userStatus: function (status) {
    if (!status) {
      return 'gray';
    } else if (status.idle) {
      return 'orange';
    } else if (status.online) {
      return 'green';
    } else {
      return 'gray';
    }
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
      user: Meteor.user(),
      contacts
    });
  }
}

export const SidebarComponent = composeWithTracker(composer)(sidebar);
