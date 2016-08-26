import React from 'react';

import './ChatSidebarAvatarComponentStyle.less';

export const ChatSidebarAvatarComponent = props => (
  <div className={"chat-sidebar-avatar " + props.position}>
    <img className="ui fluid image" src="http://semantic-ui.com/images/wireframe/image.png" />
  </div>
);
