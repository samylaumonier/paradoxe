import React from 'react';


export const MainLayout = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

MainLayout.propTypes = {
  children: React.PropTypes.node,
};
