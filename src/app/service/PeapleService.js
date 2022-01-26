const PeapleRepository = require('../repository/PeapleRepository')
const moment = require('moment')

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
        if(data.Peaple.length === 0)throw new Error('Not Found!')
        return data
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
            throw new Error('you must be at least 18 years old')
        }
    }

}

module.exports = new PeapleService