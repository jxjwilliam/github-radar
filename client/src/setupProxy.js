const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy("/api/", {target: "http://localhost:8888"}));
  app.use(proxy("/graphql/", {target: "http://localhost:8889"}));
}