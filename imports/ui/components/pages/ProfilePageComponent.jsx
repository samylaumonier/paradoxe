import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';
import { NotFoundPageComponent } from '/imports/ui/components/pages/NotFoundPageComponent';
import { SpinnerComponent } from '/imports/ui/components/parts/app/spinner/SpinnerComponent';

import '/imports/ui/styles/pages/ProfilePageComponentStyle.less';

export const ProfilePageComponent = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    loadProfile: React.PropTypes.func.isRequired,
    ready: React.PropTypes.bool.isRequired,
    
  },
  componentWillMount: function () {
    this.props.loadProfile();
  },
  render: function () {
    if (!this.props.ready) {
      return (
        <SpinnerComponent />
      );
    }
  
    return this.props.user
      ? <div id="profile-page">
      <div className="grid">
      <div className="fourteen wide">
        <div className="ui page grid ui bottom attached segment secondary">
          <div className="column">
            <div className="ui card">
              <div className="image">
                <AvatarComponent user={this.props.user} className={"ui profile-avatar image"} size={290}/>
              </div>
            </div>
  
            <div className="content">
              <span className="username">{this.props.user.username}</span>
            </div>
            
          </div>
        </div>
        <br/>
      </div>
      
          {/*<div className="ui bottom attached secondary segment">*/}
          {/*</div>*/}
      </div>
      </div>
      : <NotFoundPageComponent />;
  },
});
