import { STORE_PRODUCTS_SUBSCRIPTION_READY, STORE_PRODUCTS_SUBSCRIPTION_CHANGED } from '/imports/actions/store/products/load';

const initialState = {
  ready: false,
  products: [],
};

export function store(state = initialState, action) {
  switch (action.type) {
    case STORE_PRODUCTS_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.ready,
      };
    case STORE_PRODUCTS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        products: action.data.products,
      };
    default:
      return state;
  }
}
