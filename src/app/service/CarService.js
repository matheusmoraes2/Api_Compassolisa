const CarRepository = require('../repository/CarRepository');
const NotFound = require('../error/NotFound');
const AlreadyExists = require('../error/AlreadyExists');

class CarService {
  async create(payload) {
    const data = await CarRepository.create(payload);
    return data;
  }

  async find(query) {
    let object = query;
    if (query.hasOwnProperty('acessorio')) {
      const acessorio = { 'acessorios.descricao': query.acessorio };
      delete query.acessorio;
      object = { ...query, ...acessorio };
    }

    const data = await CarRepository.find(object);
    // if (data.Cars.length === 0) {
    //   if (query.length === 0) {
    //     return data;
    //   }

    //   throw new NotFound(JSON.stringify(object));
    // }

    return data;
  }

  async delete(id) {
    const data = await CarRepository.delete(id);
    if (data === null) throw new NotFound(`Id: ${id}`);
  }

  async put(id, payload) {
    // const dados = await this.findId(id);

    // this.SearchingAcessorio(dados,payload.acessorios);
    // const Acessorio = {acessorios:payload.acessorios};
    // delete payload.acessorios;
    // const dataAcessorios = await CarRepository.putAcessorios(id,Acessorio);

    const data = await CarRepository.put(id, payload);
    if (data === null) throw new NotFound(`Id: ${id}`);
  }

  async SearchingAcessorio(id, acessorios) {
    const dados = await this.findId(id);

    const obj = dados.acessorios;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].descricao === acessorios.descricao) {
        throw new AlreadyExists(`descricao:'${acessorios.descricao}'`);
      }
    }
  }

  async findId(id) {
    const dados = await CarRepository.findId(id);
    if (dados === null) {
      throw new NotFound(`Id: ${id}`);
    } else {
      return dados;
    }
  }

  async patchAcessorio(id, idAcessorio, acessorio) {
    await this.SearchingAcessorio(id, acessorio);

    const data = await CarRepository.putAcessorios(id, idAcessorio, acessorio);
    if (data === null) throw new NotFound(`Id: ${id}`);
  }
}

module.exports = new CarService();
