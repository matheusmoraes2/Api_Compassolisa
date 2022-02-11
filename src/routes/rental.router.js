const RentalController = require('../app/controller/RentalController')
const ValidatePost = require('../app/validation/Rental/post')
const ValidateId = require('../app/validation/Car/objectID')
const ValitadeGet = require('../app/validation/Rental/get')

module.exports = (server,routes,prefix = '/api/v1/rental') => {
    routes.post('/',ValidatePost,RentalController.create);
    routes.get('/',ValitadeGet, RentalController.find);
    routes.get('/:id',ValidateId,RentalController.findId)
    routes.put('/:id',ValidateId,ValidatePost,RentalController.put)
    routes.delete('/:id',ValidateId, RentalController.delete)
    server.use(prefix,routes);
}
