const PeapleController = require('../app/controller/PeapleController');
const ValidatePost = require('../app/validation/People/post');
const ValidatePut = require('../app/validation/People/put');
const ValidateId = require('../app/validation/Car/objectID');
const ValidateGet = require('../app/validation/People/get');

module.exports = (server, routes , prefix = '/api/v1/people') => {
  routes.post('/', ValidatePost, PeapleController.create);
  routes.get('/', ValidateGet, PeapleController.find);
  routes.put('/:id',ValidateId,ValidatePut,PeapleController.put);
  routes.delete('/:id',ValidateId,PeapleController.delete);
  routes.get('/:id',ValidateId, PeapleController.findId);
  server.use(prefix,routes);
};