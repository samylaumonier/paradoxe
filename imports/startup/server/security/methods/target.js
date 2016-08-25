Security.defineMethod('ifIsTarget', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return userId === doc.targetId;
  },
});
