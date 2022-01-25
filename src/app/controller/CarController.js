const CarService = require('../service/CarService')

class CarController {
    async create(req,res,next){
        try{
            const data = await CarService.create(req.body)
            return res.status(201).json(data)
        }catch(error){
            return res.status(400).json(error.message)
        }
    }

    async find(req,res,next){
        try{
            const modelo = req.query.modelo
            const cor = req.query.cor
            const ano = req.query.ano
            const acessorio = req.query.acessorio
            const quantidadePassageiros = req.query.quantidadePassageiros
            const _id = req.query.id
            const data = await CarService.find(modelo,cor,ano,acessorio,quantidadePassageiros,_id)
            return res.status(200).json(data)
        }catch(error){
            return res.status(404).json(error.message)
        }
    }

    async delete(req,res,next){
        try{
            const id = req.params.id
            await CarService.delete(id)
            return res.status(204).end()            
        }catch(error){
            return res.status(404).json(error.message)
        }
    }
    async put(req,res,next){
        try{
            const id = req.params.id
            const dados = req.body
            const data = await CarService.put(id,dados)
            return res.status(204).json(data)
        }catch(error){
            res.status(404).json(error.message)
        }
    }
    async findId(req,res,next){
        try{
        const id = req.params.id
        const data = await CarService.findId(id)
        res.status(200).json(data)
        }catch(error){
            res.status(404).json(error.message)
        }
    }
}

module.exports = new CarController