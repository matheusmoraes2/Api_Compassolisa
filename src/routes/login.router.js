const PeapleController = require('../app/controller/PeapleController');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/', PeapleController.login);
  server.use(prefix,routes);
};