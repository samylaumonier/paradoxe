import React from 'react';
import Masonry from 'react-masonry-component';

import { InviteItemContainer } from '/imports/ui/containers/parts/invites/InviteItemContainer';

import '/imports/ui/styles/pages/InvitesPageComponentStyle.less'

const masonryOptions = {
  transitionDuration: 0,
  gutter: 20
};

export const InvitesPageComponent = React.createClass({
  propTypes: {
    ready: React.PropTypes.bool.isRequired,
    invites: React.PropTypes.array.isRequired,
    loadInvites: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadInvites();
  },
  render: function () {
    const invites = this.props.invites.length
      ? <Masonry className="invites" options={masonryOptions} updateOnEachImageLoad={true}>
        {this.props.invites.map(invite =>
          <InviteItemContainer
            key={invite._id}
            invite={invite}
          />
        )}
      </Masonry>
      : <p>No invites yet!</p>;

    return (
      <div className="ui bottom attached segment">
        <h1>Pending invites</h1>
        {invites}
      </div>
    );
  }
});
