const RentalService = require('../service/RentalService')
const ErrorStatus = require('../error/ErrorStatus');

class RentalController{
    async create(req, res){
        try{
            const data = await RentalService.create(req.body)
            return res.status(201).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error)
        }
    }
    async find(req,res){
        try{
            const {... query} = req.query
            const data = await RentalService.find(query)
            return res.status(200).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error)
        }
    }
    async findId(req,res){
        try{
            const id = req.params.id
            const data = await RentalService.findId(id)
            return res.status(200).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error)
        }
    }
    async put(req,res){
        try{
            const id = req.params.id
            await RentalService.put(id,req.body)
            return res.status(204).end()
        }catch(error){
            return res.status(ErrorStatus(error)).json(error)
        }
    }
    async delete(req,res){
        try{
            const id = req.params.id
            await RentalService.delete(id)
            return res.status(204).end()
        }catch(error){
            return res.status(ErrorStatus(error)).json(error)
        }
    }
}

module.exports = new RentalController