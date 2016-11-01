
import { Meteor } from 'meteor/meteor';

import { Files } from '/imports/api/collections/files';
import { Products } from '/imports/api/collections/products';

Meteor.publish('store.products', function () {
  this.autorun(function () {
    if (!this.userId) {
      return [];
    }
    
    // Products
    const products = Products.find({});
    
    // Profile pictures
//    const files = Files.find({
//      _id: {
//        $in: _.compact(_.map(users.fetch(), user => user.profile.pictureId)),
//      },
//    }).cursor;
    
    return [
      products,
//      files
    ];
  });
});

