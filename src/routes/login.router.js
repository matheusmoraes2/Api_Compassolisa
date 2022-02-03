const PeapleController = require('../app/controller/PeapleController');
const ValidateLogin = require('../app/validation/Pessoa/login')

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/',ValidateLogin, PeapleController.login);
  server.use(prefix,routes);
};