const CarController = require('../app/controller/CarController');
const ValidateP = require('../app/validation/Car/post')
const ValidatePut = require('../app/validation/Car/put')

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', ValidateP, CarController.create);
    routes.get('/', CarController.find);
    routes.delete('/:id', CarController.delete)
    routes.put('/:id',ValidatePut, CarController.put)
    routes.get('/:id',CarController.findId)
    server.use(prefix,routes)
}