const CarRepository = require('../repository/CarRepository')
const { PaginationParameters } = require('mongoose-paginate-v2')

class CarService {
    async create(payload) {
        const data = await CarRepository.create(payload)
        return data
    }
    async find(modelo,cor,ano,acessorio,quantidadePassageiros,_id){

        const ObjModelo = this.validateModelo(modelo)
        const ObjCor = this.validateCor(cor)
        const ObjAno = this.validateAno(ano)
        const ObjAcessorio = this.validateAcessorio(acessorio)
        const ObjQp = this.validateQp(quantidadePassageiros)
        const ObjId = this.validateId(_id)
        const obj = Object.assign({}, ObjModelo, ObjCor,ObjAcessorio,ObjQp,ObjId) 
        const data = await CarRepository.find(obj)
        return data
    }
    async delete(id){
        const dados = await CarRepository.find({_id:id})
        console.log(dados)
        if(dados.Cars.length === 0){
            throw new Error('Not found')
        }
        await CarRepository.delete(id)
    }

    validateId(id){
         let obj = {}
        if (typeof id !== 'undefined') {
            obj = {_id:id}
        }
        return obj
    }
    validateQp(qp){
        let obj = {}
        if (typeof qp !== 'undefined') {
            obj = {quantidadePassageiros:qp}
        }
        return obj
    }
    validateAcessorio(acessorio){
        let obj = {}
        if (typeof acessorio !== 'undefined') {
            obj = {"acessorios.descricao": acessorio}
        }
        return obj
    }
    validateAno(ano){
        let obj = {}
        if (typeof ano !== 'undefined') {
            obj = {ano:ano}
        }
        return obj
    }
    validateCor(cor){
        let obj = {}
        if (typeof cor !== 'undefined') {
            obj = {cor:cor}
        }
        return obj
    }
    validateModelo(modelo){
        let obj = {}
        if (typeof modelo !== 'undefined') {
            obj = {modelo:modelo}
        }
        return obj
    }
}

module.exports = new CarService
