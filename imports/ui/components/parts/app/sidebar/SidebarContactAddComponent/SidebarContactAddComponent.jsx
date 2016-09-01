import { Meteor } from 'meteor/meteor';
import React from 'react';

export const SidebarContactAddComponent = React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },
  componentDidMount: function () {
    const dropdown = $(this.refs.dropdown);

    dropdown.dropdown({
      minCharacters: 3,
      maxSelections: 20,
      apiSettings: {
        action: 'search users',
        throttle: 100,
        cache: false,
        beforeXHR: xhr => {
          xhr.setRequestHeader('X-User-Id', Meteor.userId());
          xhr.setRequestHeader('X-Login-Token', localStorage.getItem('Meteor.loginToken'));
        },
        beforeSend: settings => {
          settings.urlData = {
            username: dropdown.closest('.dropdown').find('input.search').val()
          };

          return settings;
        }
      },
      saveRemoteData: false
    });
  },
  render: function () {
    return (
      <div className="ui modal" id="contact-add-modal">
        <i className="close icon" />
        <div className="header">
          Add contacts
        </div>
        <div className="content">
          <div className="ui sub header">Users</div>
          <select className="ui fluid search dropdown" multiple ref="dropdown">
            <option value="">Search for users</option>
          </select>
        </div>
        <div className="actions">
          <div className="ui black deny button">
            Cancel
          </div>
          <div className="ui positive right labeled icon button">
            Add contacts
            <i className="checkmark icon" />
          </div>
        </div>
      </div>
    );
  }
});
