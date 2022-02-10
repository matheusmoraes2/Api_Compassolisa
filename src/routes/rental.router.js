const RentalController = require('../app/controller/RentalController')
const ValidatePost = require('../app/validation/Rental/post')

module.exports = (server,routes,prefix = '/api/v1/rental') => {
    routes.post('/',ValidatePost,RentalController.create);
    server.use(prefix,routes);
}
