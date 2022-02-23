const axios = require('axios');
const RentalRepository = require('../repository/RentalRepository');
const IsFilialDuplicate = require('../error/IsFilialDuplicate');
const AlreadyExists = require('../error/AlreadyExists');
const NotFound = require('../error/NotFound');

class RentalService {
  async create(payload) {
    this.isFilialDuplicate(payload.endereco);
    const cnpj = await RentalRepository.findCnpj(payload.cnpj);
    if (cnpj !== null) throw new AlreadyExists(`Cnpj: '${payload.cnpj}'`);
    const viaCep = await this.FindCep(payload);
    const data = await RentalRepository.create(viaCep);
    return data;
  }

  async FindCep(payload) {
    const data = payload;
    for (let i = 0; i < payload.endereco.length; i++) {
      const viaCep = await axios.get(`https://viacep.com.br/ws/${payload.endereco[i].cep}/json`);
      data.endereco[i].logradouro = viaCep.data.logradouro;
      data.endereco[i].bairro = viaCep.data.bairro;
      data.endereco[i].localidade = viaCep.data.localidade;
      data.endereco[i].uf = viaCep.data.uf;
    }
    return data;
  }

  isFilialDuplicate(payload) {
    let j = 0;
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].isFilial === false) {
        j += 1;
      }
    }
    if (j > 1) {
      throw new IsFilialDuplicate();
    }
  }

  async find(query) {
    const data = await RentalRepository.find(query);
    //   if (data.Rental.length === 0) {
    //     if (query.length === 0) {
    //       return data;
    //     }

    //     throw new NotFound(JSON.stringify(query));
    //   }
    return data;
  }

  async findId(id) {
    const data = await RentalRepository.findId(id);
    if (data === null) throw new NotFound(`id: '${id}'`);
    return data;
  }

  async put(id, payload) {
    this.isFilialDuplicate(payload.endereco);
    const cnpj = await RentalRepository.findCnpj(payload.cnpj);
    if (cnpj !== null) {
      const find = await this.findId(id);
      if (cnpj.cnpj !== find.cnpj) throw new AlreadyExists(`Cnpj: '${payload.cnpj}'`);
    }
    const viaCep = await this.FindCep(payload);
    const data = await RentalRepository.put(id, viaCep);
    if (data === null) throw new NotFound(`id: '${id}'`);
  }

  async delete(id) {
    const data = await RentalRepository.delete(id);
    if (data === null) throw new NotFound(`id: '${id}'`);
  }
}

module.exports = new RentalService();
