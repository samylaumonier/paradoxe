import Response from 'meteor-node-stubs/node_modules/http-browserify/lib/response';

if (!Response.prototype.setEncoding) {
  Response.prototype.setEncoding = function (encoding) {
    // do nothing
  };
}
