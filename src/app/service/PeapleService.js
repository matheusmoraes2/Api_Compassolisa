const PeapleRepository = require('../repository/PeapleRepository')
const moment = require('moment')
const NotFound = require('../error/NotFound')
const InvalidBody = require('../error/InvalidBody')
const LoginError = require('../error/LoginError')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

class PeapleService{
    async create(payload){
        this.validateData(payload.data_nascimento)
        const data = await PeapleRepository.create(payload)
        return data
    }
    async find(query){
        let object = query
        if(query.hasOwnProperty('nome')){
            const nome = {nome: { $regex: '.*' + query.nome + '.*' }}
            delete query.nome
            object = Object.assign({},query,nome)   
        }
        const data = await PeapleRepository.find(object)
        if(data.Peaple.length === 0)throw new NotFound(`Object`)
        return data
    }
    async put(id,payload){
        if(typeof payload.data_nascimento !== 'undefined'){
            this.validateData(payload.data_nascimento)
        }
        const data = await PeapleRepository.put(id,payload)
        if(data === null)throw new NotFound(`Id:'${id}'`)
    }
    async delete(id){
        const data = await PeapleRepository.delete(id)
        if(data === null)throw new NotFound(`Id:'${id}'`)
    }
    async findId(id){
        const data = await PeapleRepository.findId(id)
        if(data === null){
            throw new NotFound(`Id:'${id}'`)
        }else{
            return data
        }
    }
    async login(payload){
        const senha = payload.senha
        const email = payload.email
        const data = await PeapleRepository.authenticate(email)
        if (data === null || !(await bcrypt.compare(senha, data.senha))){
            throw new LoginError()
        }
        const token = jwt.sign({ email }, process.env.SECRET, {
            expiresIn: 300 
        });
        const Obj = Object.assign({},{token:token,email:data.email,habilitado:data.habilitado})
        return Obj
    }


    validateData(data){
        const Formatdata = moment(data, "DD/MM/YYYY")
        const nascY = new Date(Formatdata).getFullYear()
        const nascM = new Date(Formatdata).getMonth()
        const nascD = new Date(Formatdata).getDate()
        const dataY = new Date().getFullYear()
        const dataM = new Date().getMonth()
        const dataD = new Date().getDate()
        const anoDiff = dataY - nascY
        const mesDiff = dataM - nascM
        const diaDiff = dataD - nascD
        if ((anoDiff < 18) || (anoDiff === 18 && mesDiff < 0 ) || (anoDiff === 18 && mesDiff === 0 && diaDiff < 0)){
            throw new InvalidBody(`you must be at least 18 years old. data_nascimento: '${data}',`)
        }
    }

}

module.exports = new PeapleService