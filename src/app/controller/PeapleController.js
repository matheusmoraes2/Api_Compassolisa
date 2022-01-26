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
            return res.status(404).json(error.message)
        }
    }

}

module.exports = new PeapleController