Security.defineMethod('ifIsOwner', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return userId === doc.userId;
  },
});
