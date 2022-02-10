const RentalController = require('../app/controller/RentalController')
const ValidatePost = require('../app/validation/Rental/post')

module.exports = (server,routes,prefix = '/api/v1/rental') => {
    routes.post('/',ValidatePost,RentalController.create);
    routes.get('/',RentalController.find);
    routes.get('/:id',RentalController.findId)
    routes.put('/:id',RentalController.put)
    routes.delete('/:id', RentalController.delete)
    server.use(prefix,routes);
}
