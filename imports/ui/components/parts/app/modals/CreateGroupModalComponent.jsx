import React from 'react';

import { LockableButtonComponent } from '/imports/ui/components/parts/app/spinner/LockableButtonComponent';

import '/imports/ui/styles/parts/modals/CreateGroupModalComponentStyle.less';

export const CreateGroupModalComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    loginToken: React.PropTypes.string.isRequired,
    createGroup: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    const modal = $(this.refs.modal);

    modal.modal({
      context: '#modals',
      closable: false,
      onApprove: () => {
        console.log('approve');
      }
    });

    const dropdown = $(this.refs.dropdown);

    dropdown.dropdown({
      minCharacters: 3,
      maxSelections: 20,
      apiSettings: {
        action: 'search contacts',
        throttle: 100,
        cache: false,
        beforeXHR: xhr => {
          xhr.setRequestHeader('X-User-Id', this.props.user._id);
          xhr.setRequestHeader('X-Login-Token', this.props.loginToken);
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
      <div className="ui modal" ref="modal" id="group-create-modal">
        <i className="close icon"/>
        <div className="header">
          New group
        </div>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name" ref="name" required/>
            </div>
            <div className="field">
              <label>Contacts</label>
              <select className="ui fluid search dropdown" multiple ref="dropdown" name="usernames" required>
                <option value="">Search for contacts</option>
              </select>
            </div>
            <div className="field">
              <label>Picture (optional)</label>
              <div className="ui action input">
                <input type="text" placeholder="Browse..." ref="picture" readOnly/>
                <input type="file" className="hidden" ref="file" onChange={this.onFileChange}/>
                <button className="ui button" type="button" onClick={this.onBrowse}>Browse</button>
              </div>
            </div>
            <div className="inline field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="private" ref="private"/>
                <label>Private group</label>
              </div>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui black deny button">
            Cancel
          </div>
          <LockableButtonComponent ref="button" type="submit" className="ui green button" onClick={this.onSubmit}>
            Create group
          </LockableButtonComponent>
        </div>
      </div>
    );
  },
  onFileChange: function (event) {
    const file = _.first(event.target.files);
    $(this.refs.picture).val(file ? file.name : '');
  },
  onBrowse: function () {
    $(this.refs.file).click();
  },
  onSubmit: function (button) {
    if (button.isLocked()) {
      return false;
    }

    button.lock();

    const name = $(this.refs.name);
    const usernames = $(this.refs.dropdown);
    const isPrivate = $(this.refs.private);
    const fileInput = $(this.refs.file);
    const picture = $(this.refs.picture);

    this.props.createGroup({
      name: name.val(),
      usernames: usernames.val(),
      file: _.first(fileInput.files),
      isPrivate: isPrivate.prop('checked'),
    }, err => {
      button.unlock();

      if (!err) {
        $(this.refs.modal).modal('hide');
        name.val('');
        usernames.dropdown('clear');
        isPrivate.prop('checked', false);
        fileInput.val(null);
        picture.val('');
      }
    });
  },
});
