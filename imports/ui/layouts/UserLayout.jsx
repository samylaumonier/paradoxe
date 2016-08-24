import React from 'react';

import { SidebarComponent } from '../components/SidebarComponent/SidebarComponent';

export const UserLayout = ({ children }) => (
  <div>
    <SidebarComponent />
    <div className="pusher">
      {children}
    </div>
  </div>
);

UserLayout.propTypes = {
  children: React.PropTypes.node,
};
