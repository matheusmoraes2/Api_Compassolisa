const PeapleController = require('../app/controller/PeapleController')
const ValidateP = require('../app/validation/Pessoa/post')

module.exports = (server, routes , prefix = '/api/v1/peaple') => {
    routes.post('/', ValidateP, PeapleController.create);
    server.use(prefix,routes)
}