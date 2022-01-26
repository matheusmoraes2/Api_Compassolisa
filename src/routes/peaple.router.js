const PeapleController = require('../app/controller/PeapleController')
const ValidateP = require('../app/validation/Pessoa/post')
const ValidatePut = require('../app/validation/Pessoa/put')

module.exports = (server, routes , prefix = '/api/v1/peaple') => {
    routes.post('/', ValidateP, PeapleController.create);
    routes.get('/', PeapleController.find);
    routes.put('/:id',ValidatePut,PeapleController.put);
    routes.delete('/:id',PeapleController.delete)
    server.use(prefix,routes)
}