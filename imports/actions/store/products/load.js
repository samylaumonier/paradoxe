
import { Meteor } from 'meteor/meteor';

import { Products } from '/imports/api/collections/products';

export const STORE_PRODUCTS_SUBSCRIPTION = 'STORE_PRODUCTS_SUBSCRIPTION';
export const STORE_PRODUCTS_SUBSCRIPTION_READY = 'STORE_PRODUCTS_SUBSCRIPTION_READY';
export const STORE_PRODUCTS_SUBSCRIPTION_CHANGED = 'STORE_PRODUCTS_SUBSCRIPTION_CHANGED';

export function loadProducts() {
  return dispatch => {
    dispatch({
      type: STORE_PRODUCTS_SUBSCRIPTION,
      meteor: {
        subscribe: () => Meteor.subscribe('store.products'),
        get: () => {
          const user = Meteor.user();
          
          if (user) {
            const products = Products.find({},{
              sort: {
                createdAt: -1,
              },
            }).fetch();
            
            return {
              products,
            };
          }
          
          return {
            products: [],
          };
        },
      },
    });
  };
}
