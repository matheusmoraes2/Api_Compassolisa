const RentalService = require('../service/RentalService')
const ErrorStatus = require('../error/ErrorStatus');

class RentalController{
    async create(req, res){
        try{
            const data = await RentalService.create(req.body)
            return res.status(200).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error)
        }
    }
}

module.exports = new RentalController