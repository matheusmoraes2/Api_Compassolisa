const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload){
    return CarSchema.create(payload);
  }

  async find(payload){
      
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Cars',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    const options = {
      page: 1,
      limit: 100,
      customLabels: myCustomLabels
    };

    const retorno = await CarSchema.paginate(payload,options,{});
    return retorno;
  }
  async findId(id){
    return CarSchema.findById(id,'-__v');
  }
  async delete(id){
    return CarSchema.findOneAndDelete({_id:id});
  }
  async put(id,payload){
    return CarSchema.findOneAndUpdate({_id:id},payload);
  }
  async putAcessorios(id,idAcessorio,acessorio){
    return CarSchema.findOneAndUpdate({_id:id,'acessorios._id':idAcessorio},{$set:{'acessorios.$':acessorio}})
  }

}

module.exports = new CarRepository;