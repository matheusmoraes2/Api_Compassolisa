const CarController = require('../app/controller/CarController');
const ValidateP = require('../app/validation/Car/post')

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', ValidateP, CarController.create);
    routes.get('/', CarController.find);
    routes.delete('/:id', CarController.delete)
    server.use(prefix,routes)
}