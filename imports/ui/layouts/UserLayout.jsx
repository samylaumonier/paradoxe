import React from 'react';

import { SidebarComponent } from '../components/SidebarComponent';

export const UserLayout = ({ children }) => (
  <div className="container">
    <SidebarComponent />
    <div className="pusher">
      {children}
    </div>
  </div>
);

UserLayout.propTypes = {
  children: React.PropTypes.node,
};
