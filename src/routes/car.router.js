const CarController = require('../app/controller/CarController');
const ValidatePost = require('../app/validation/Car/post');
const ValidatePut = require('../app/validation/Car/put');
const ValidateId = require('../app/validation/Car/objectID');
const ValidateGet = require('../app/validation/Car/get');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', ValidatePost, CarController.create);
  routes.get('/', ValidateGet, CarController.find);
  routes.delete('/:id',ValidateId, CarController.delete);
  routes.put('/:id',ValidateId, ValidatePut, CarController.put);
  routes.get('/:id',ValidateId, CarController.findId);
  server.use(prefix,routes);
};