const CarRepository = require('../repository/CarRepository');
const NotFound = require('../error/NotFound');
const AlreadyExists = require('../error/AlreadyExists');

class CarService {
  async create(payload) {
    const data = await CarRepository.create(payload);
    return data;
  }
  async find(query){
    let object = query;
    if(query.hasOwnProperty('acessorio')){
      const acessorio = {'acessorios.descricao': query.acessorio};
      delete query.acessorio;
      object = Object.assign({},query,acessorio);   
    }

    const data = await CarRepository.find(object);
    if(data.Cars.length === 0){
      throw new NotFound('Object');
    }

    return data;
  }
  async delete(id){
    const data = await CarRepository.delete(id);
    if(data === null)throw new NotFound(`Id:${id}`);
  }
  async put(id,payload){
    const dados = await this.findId(id);
    let data;
    if(typeof payload.acessorios !== 'undefined'){
      this.SearchingAcessorio(dados,payload.acessorios);
      const Acessorio = {acessorios:payload.acessorios};
      delete payload.acessorios;
      data = await CarRepository.putAcessorios(id,Acessorio);
    }
    data = await CarRepository.put(id,payload);
    if(data === null)throw new NotFound(`Id:${id}`);
  }

  SearchingAcessorio(dados,acessorios){
    const obj = dados.acessorios;
    const busca = acessorios;
    for(let i=0; i<obj.length;i++){
      for(let j=0; j<busca.length;j++){
        if(obj[i].descricao === busca[j].descricao){
          throw new AlreadyExists(`descricao:'${busca[j].descricao}'`);
        }
      }
    }
  }
  async findId(id){
    const dados = await CarRepository.findId(id);
    if(dados === null){
      throw new NotFound(`Id:${id}`);
    }else{
      return dados;
    }
  }

}

module.exports = new CarService;
