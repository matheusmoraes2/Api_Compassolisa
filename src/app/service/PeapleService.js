const PeapleRepository = require('../repository/PeapleRepository')
const moment = require('moment')
const NotFound = require('../error/NotFound')
const InvalidBody = require('../error/InvalidBody')
const LoginError = require('../error/LoginError')
require('dotenv').config()
const jwt = require('jsonwebtoken')

class PeapleService{
    async create(payload){
        this.validateData(payload.data_nascimento)
        const data = await PeapleRepository.create(payload)
        return data
    }
    async find(nome,cpf,Bd,email,habilitado){
        const ObjNome = this.ValidateNome(nome)
        const ObjCpf = this.VailidateCpf(cpf)
        const ObjsBd = this.ValidateBd(Bd)
        const ObjEmail = this.ValidateEmail(email)
        const ObjHabilitado = this.ValidateHabilitado(habilitado)

        const Obj = Object.assign({},ObjNome,ObjCpf,ObjsBd,ObjEmail,ObjHabilitado)
        const data = await PeapleRepository.find(Obj)
        if(data.Peaple.length === 0)throw new NotFound(`Object`)
        return data
    }
    async put(id,payload){
        if(payload.data_nascimento !== null){
            this.validateData(payload.data_nascimento)
        }
        await this.findId(id)
        await PeapleRepository.put(id,payload)
    }
    async delete(id){
        await this.findId(id)
        await PeapleRepository.delete(id)
    }
    async findId(id){
        const data = await PeapleRepository.findId(id)
        if(data === null){
            throw new NotFound(`Id:'${id}'`)
        }else{
            return data
        }
    }
    async login(email,senha){
        const data = await PeapleRepository.authenticate(email)
        if (data === null || data.senha !== senha){
            throw new LoginError()
        }
        const token = jwt.sign({ email }, process.env.SECRET, {
            expiresIn: 300 
        });
        const Obj = Object.assign({},{token:token,email:data.email,habilitado:data.habilitado})
        return Obj
    }

    ValidateHabilitado(habilitado){
        let obj = {}
        if (typeof habilitado !== 'undefined') {
            obj = {habilitado:habilitado}
        }
        return obj
    }
    ValidateEmail(email){
        let obj = {}
        if (typeof email !== 'undefined') {
            obj = {email:email}
        }
        return obj
    }
    ValidateBd(Bd){
        let obj = {}
        if (typeof Bd !== 'undefined') {
            obj = {Bd:Bd}
        }
        return obj
    }
    VailidateCpf(cpf){
        let obj = {}
        if (typeof cpf !== 'undefined') {
            obj = {cpf:cpf}
        }
        return obj
    }
    ValidateNome(nome){
        let obj = {}
        if (typeof nome !== 'undefined') {
            obj = { nome: { $regex: '.*' + nome + '.*' } }
        }
        return obj
    }

    validateData(data){
        const birthday = moment(data, "DD/MM/YYYY")
        const Formatdata = birthday.format("YYYY-MM-DD")
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