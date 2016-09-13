import React from 'react';
import { browserHistory } from 'react-router';
import { If, Then } from 'react-if';

import { getUserStatus, userHasBlockedContact } from '/imports/api/collections/users';
import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

import './SidebarContactItemComponentStyle.less';

export const SidebarContactItemComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired
  },
  componentDidMount: function () {
    this.initTooltips();
  },
  componentDidUpdate: function () {
    this.initTooltips();
  },
  render: function () {
    return (
      <div className="item" onClick={this.openChat}>
        <span className={"user-status mini ui empty circular label " + getUserStatus(this.props.contact.status)}/>
        <AvatarComponent user={this.props.contact} className={"ui avatar image"} size={22}/>
        <div className="content">
          <div className="header" ref="header">
            {this.props.contact.username}
            <If condition={userHasBlockedContact(this.props.user, this.props.contact._id)}>
              <Then>
                <i className="red dont icon user-blocked" data-content="Blocked"/>
              </Then>
            </If>
          </div>
        </div>
      </div>
    );
  },
  openChat: function () {
    // TODO: create smart component + mapDispatchToProps
    browserHistory.push(`/chat/${this.props.contact.username}`);
  },
  initTooltips: function () {
    $(this.refs.header).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'right center',
      variation: 'mini'
    });
  },
});
