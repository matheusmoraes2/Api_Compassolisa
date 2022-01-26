const PeapleRepository = require('../repository/PeapleRepository')
const moment = require('moment')

class PeapleService{
    async create(payload){
        this.validateData(payload.data_nascimento)
        const data = await PeapleRepository.create(payload)
        return data
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