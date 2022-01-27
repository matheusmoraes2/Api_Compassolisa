const CarRepository = require('../repository/CarRepository')
const { PaginationParameters } = require('mongoose-paginate-v2')
const NotFound = require('../error/NotFound')
const AlreadyExists = require('../error/AlreadyExists')

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
        const obj = Object.assign({}, ObjModelo, ObjCor,ObjAcessorio,ObjQp,ObjId,ObjAno) 
        const data = await CarRepository.find(obj)
        if(data.Cars.length === 0){
            throw new NotFound(`Object`)
        }

        return data
    }
    async delete(id){
        await this.findId(id)
        await CarRepository.delete(id)
    }
    async put(id,payload){
        const dados = await this.findId(id)
        this.FoundAcessorio(dados,payload.acessorios)
        const ObjModelo = this.validateModelo(payload.modelo)
        const ObjAno = this.validateAno(payload.ano)
        const ObjCor = this.validateCor(payload.cor)
        const ObjQp = this.validateQp(payload.quantidadePassageiros)
        const ObjAcessorio = this.FormatAcessorio(payload)

        const Obj = Object.assign({},ObjModelo,ObjAno,ObjCor,ObjQp)
        const data = await CarRepository.put(id,Obj,ObjAcessorio)
        return data
    }

    FormatAcessorio(payload){
        let obj = {}
        if(typeof payload.acessorios !== 'undefined'){
            obj = {acessorios:payload.acessorios}
        }
        return obj
    }
    FoundAcessorio(dados,Facessorios){
        const obj = dados.acessorios
        const busca = Facessorios
        for(let i=0; i<obj.length;i++){
            for(let j=0; j<busca.length;j++){
                if(obj[i].descricao === busca[j].descricao){
                    throw new AlreadyExists(`descricao:'${busca[j].descricao}'`)
                }
            }
        }
    }
    async findId(id){
        const dados = await CarRepository.findId(id)
        if(dados === null){
            throw new NotFound(`Id:${id}`)
        }else{
            return dados
        }
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
