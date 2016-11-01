export const Products = new Mongo.Collection('products');

const ProductRatingSchema = new SimpleSchema({
  userId: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  }
});

export const ProductsSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  type: {
    type: String,
  },
  rating: {
    type: String,
  },
  ratings: {
    type: [ProductRatingSchema],
  },
  imageId: {
    type: String,
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});


