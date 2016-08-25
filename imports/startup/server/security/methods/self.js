Security.defineMethod('ifIsSelf', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return userId === doc._id;
  },
});
