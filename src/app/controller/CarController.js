const CarService = require('../service/CarService')
const Erros = require('../error/ErrorStatus')
const ErrorStatus = require('../error/ErrorStatus')

class CarController {
    async create(req,res,next){
        try{
            const data = await CarService.create(req.body)
            return res.status(201).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error.message)
        }
    }

    async find(req,res,next){
        try{
            const {... query} = req.query
            const data = await CarService.find(query)
            return res.status(200).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error.message)
        }
    }

    async delete(req,res,next){
        try{
            const id = req.params.id
            await CarService.delete(id)
            return res.status(204).end()            
        }catch(error){
            return res.status(ErrorStatus(error)).json(error.message)
        }
    }
    async put(req,res,next){
        try{
            const id = req.params.id
            const dados = req.body
            const data = await CarService.put(id,dados)
            return res.status(204).end()
        }catch(error){
            res.status(ErrorStatus(error)).json(error.message)
        }
    }
    async findId(req,res,next){
        try{
        const id = req.params.id
        const data = await CarService.findId(id)
        res.status(200).json(data)
        }catch(error){
            res.status(ErrorStatus(error)).json(error.message)
        }
    }
}

module.exports = new CarController