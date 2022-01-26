const PeapleService = require('../service/PeapleService')

class PeapleController{
    async create(req,res,next){
        try{
            const data = await PeapleService.create(req.body)
            return res.status(201).json(data)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

}

module.exports = new PeapleController