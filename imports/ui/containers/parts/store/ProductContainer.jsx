import { connect } from 'react-redux';

import { loadProducts } from '/imports/actions/store/products/load';

import { ProductComponent } from '/imports/ui/components/parts/store/ProductComponent';

const mapStateToProps = state => {
  return {
    ready: state.store.ready,
    products: state.store.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () => {
      dispatch(loadProducts());
    }
  };
};

export const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent);
