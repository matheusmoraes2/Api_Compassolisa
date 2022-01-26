const PeapleController = require('../app/controller/PeapleController')
const ValidateP = require('../app/validation/Pessoa/post')
const ValidatePut = require('../app/validation/Pessoa/put')
const ValidateId = require('../app/validation/Car/objectID')

module.exports = (server, routes , prefix = '/api/v1/peaple') => {
    routes.post('/', ValidateP, PeapleController.create);
    routes.get('/', PeapleController.find);
    routes.put('/:id',ValidateId,ValidatePut,PeapleController.put);
    routes.delete('/:id',ValidateId,PeapleController.delete);
    routes.get('/:id',ValidateId, PeapleController.findId)
    server.use(prefix,routes)
}