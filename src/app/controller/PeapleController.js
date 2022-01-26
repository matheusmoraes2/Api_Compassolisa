const PeapleService = require('../service/PeapleService')
const ErrorStatus = require('../error/ErrorStatus')

class PeapleController{
    async create(req,res,next){
        try{
            const data = await PeapleService.create(req.body)
            return res.status(201).json(data)
        }catch(error){
            return res.status(ErrorStatus(error)).json(error.message)
        }
    }
    async find(req,res,next){
        try{
            const nome = req.query.nome
            const cpf = req.query.cpf
            const Bd = req.query.data_nascimento
            const email = req.query.email
            const habilitado = req.query.habilitado
            const data = await PeapleService.find(nome,cpf,Bd,email,habilitado)
            return res.status(200).json(data)  
        }catch(error){
            return res.status(ErrorStatus(error)).json(error.message)
        }
    }
    async put(req,res,next){
        try{
            const id = req.params.id
            const data = req.body
            await PeapleService.put(id,data)
            res.status(204).end()
        }catch(error){
            res.status(ErrorStatus(error)).json(error.message)
        }
    }
    async delete(req,res,next){
        try{
            const id = req.params.id
            await PeapleService.delete(id)
            res.status(204).end()
        }catch(error){
            res.status(ErrorStatus(error)).json(error.message)
        }
    }
    async findId(req,res,next){
        try{
            const id = req.params.id
            const data = await PeapleService.findId(id)
            res.status(200).json(data)
        }catch(error){
            res.status(ErrorStatus(error)).json(error.message)
        }
    }

}

module.exports = new PeapleController