import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent/AvatarComponent';

import './SidebarContactItemComponentStyle.less';

export const SidebarContactItemComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    contactStatus: React.PropTypes.string.isRequired,
    userHasBlockedContact: React.PropTypes.bool.isRequired,
    openChat: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.initTooltips();
  },
  componentDidUpdate: function () {
    this.initTooltips();
  },
  render: function () {
    const blockedIcon = this.props.userHasBlockedContact
      ? <i className="red dont icon user-blocked" data-content="Blocked"/>
      : null;

    return (
      <div className="item" onClick={this.props.openChat}>
        <span className={`user-status mini ui empty circular label ${this.props.contactStatus}`}/>
        <AvatarComponent user={this.props.contact} className={"ui avatar image"} size={22}/>
        <div className="content">
          <div className="header" ref="header">
            {this.props.contact.username}
            {blockedIcon}
          </div>
        </div>
      </div>
    );
  },
  initTooltips: function () {
    $(this.refs.header).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'right center',
      variation: 'mini',
    });
  },
});
