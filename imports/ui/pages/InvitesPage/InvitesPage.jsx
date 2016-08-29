import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then, Else } from 'react-if';
import Masonry from 'react-masonry-component';

import { InviteItemComponent } from '/imports/ui/components/invites/InviteItemComponent/InviteItemComponent';

import './InvitesPageStyle.less'

import { Invitations } from '/imports/api/collections';

const masonryOptions = {
  transitionDuration: 0,
  gutter: 20
};

const invitesPage = React.createClass({
  propTypes: {
    invites: React.PropTypes.array
  },
  render: function () {
    return (
      <div className="ui bottom attached segment">
        <h1>Pending invites</h1>
        <If condition={this.props.invites.length !== 0}>
          <Then>
            <Masonry className="invites" options={masonryOptions} updateOnEachImageLoad={true}>
              {this.props.invites.map(invite => <InviteItemComponent key={invite._id} invite={invite} />)}
            </Masonry>
          </Then>
          <Else>
            <p>No invites yet!</p>
          </Else>
        </If>
      </div>
    );
  }
});

function composer(props, onData) {
  const invitations = Meteor.subscribe('invites.received');

  if (invitations.ready()) {
    const user = Meteor.user();
    let invites = [];

    if (user) {
      invites = Invitations.find({
        targetId: user._id
      }, {
        sort: {
          sentAt: -1
        }
      }).fetch();
    }

    onData(null, {
      invites
    });
  }
}

export const InvitesPage = composeWithTracker(composer)(invitesPage);
