import React from 'react';
import { If, Then, Else } from 'react-if';
import Masonry from 'react-masonry-component';

import { InviteItemContainer } from '/imports/ui/containers/parts/invites/InviteItemContainer';

import './InvitesPageComponentStyle.less'

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
    return (
      <div className="ui bottom attached segment">
        <h1>Pending invites</h1>
        <If condition={this.props.invites.length !== 0}>
          <Then>
            <Masonry className="invites" options={masonryOptions} updateOnEachImageLoad={true}>
              {this.props.invites.map(invite =>
                <InviteItemContainer
                  key={invite._id}
                  invite={invite}
                />
              )}
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
