const CarController = require('../app/controller/CarController');
const tokenBarer = require('../app/middlewares/tokenBarer')

const ValidatePost = require('../app/validation/Car/post');
const ValidatePut = require('../app/validation/Car/put');
const ValidateId = require('../app/validation/Car/objectID');
const ValidateGet = require('../app/validation/Car/get');
const ValidatePatch = require('../app/validation/Car/patch')
const ValidatePatchId = require('../app/validation/car/patchId')

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',tokenBarer, ValidatePost, CarController.create);
  routes.get('/',tokenBarer, ValidateGet, CarController.find);
  routes.delete('/:id',tokenBarer,ValidateId, CarController.delete);
  routes.put('/:id',tokenBarer,ValidateId, ValidatePut, CarController.put);
  routes.get('/:id',tokenBarer,ValidateId, CarController.findId);
  routes.patch('/:id/acessorios/:idAcessorio',tokenBarer,ValidatePatchId,ValidatePatch, CarController.patchAcessorio)
  server.use(prefix,routes);
};