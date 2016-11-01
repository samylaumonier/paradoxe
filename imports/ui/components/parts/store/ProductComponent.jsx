import React from 'react';

import { ProductItemContainer } from '/imports/ui/containers/parts/store/ProductItemContainer';


export const ProductComponent = React.createClass({
  propTypes: {
    ready: React.PropTypes.bool.isRequired,
    products: React.PropTypes.array.isRequired,
    loadProducts: React.PropTypes.func.isRequired,
  },
  componentWillMount: function () {
    this.props.loadProducts();
  },
  render: function () {
    const products = this.props.products.length
      ? this.props.products.map(product => <ProductItemContainer key={product._id} product={product}/>)
      : <p>No products yet!</p>;
    
    return (
      <div>
        <div className="ui five doubling cards">
          {products}
        </div>
      </div>
    );
  }
});
