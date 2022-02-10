const RentalRepository = require('../repository/RentalRepository');
const isFilialDuplicate = require('../error/IsFilialDuplicate');
const AlreadyExists = require('../error/AlreadyExists')
const axios = require('axios');

class RentalService{
    async create(payload){
        this.isFilialDuplicate(payload.endereco)
        const cnpj = await RentalRepository.findCnpj(payload.cnpj)
        if(cnpj !== null)throw new AlreadyExists(`Cnpj: '${payload.cnpj}'`)  
        const viaCep = await this.FindCep(payload)
        const data = await RentalRepository.create(viaCep)
        return data
    }
    async FindCep(payload){
        const data = payload
        for(let i=0;i<payload.endereco.length;i++){
            const viaCep = await axios.get(`https://viacep.com.br/ws/${payload.endereco[i].cep}/json`)
            data.endereco[i].logradouro = viaCep.data.logradouro
            data.endereco[i].bairro = viaCep.data.bairro
            data.endereco[i].localidade = viaCep.data.localidade
            data.endereco[i].uf = viaCep.data.uf
        }
        return data      
    }
    isFilialDuplicate(payload){
        let j=0
        for(let i=0;i<payload.length;i++){
            if(payload[i].isFilial === false){
                j++
            }
        }
        if(j>1){
            throw new isFilialDuplicate()
        }
    }
}

module.exports = new RentalService