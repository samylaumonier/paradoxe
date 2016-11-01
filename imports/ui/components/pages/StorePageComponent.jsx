import React from 'react';

import { ProductContainer } from '/imports/ui/containers/parts/store/ProductContainer';

import '/imports/ui/styles/pages/StorePageComponentStyle.less';

export const StorePageComponent = React.createClass({
  propTypes: {
  },
  render: function () {
    return (
      <div id="store-page">
        <div className="ui bottom attached secondary segment">
          <h1>Our products</h1>
          <ProductContainer />
        </div>
      </div>
    );
  },
});
