const PeapleSchema = require('../schema/PeapleSchema');

class PeapleRepository{
  async create(payload){
    return PeapleSchema.create(payload);
  }
  async find(payload){
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Peaple',
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

    const retorno = await PeapleSchema.paginate(payload,options,{});
    return retorno;
  }
  async put(id,payload){
    return PeapleSchema.findOneAndUpdate({_id:id},payload);
  }
  async delete(id){
    return PeapleSchema.findOneAndDelete({_id:id});
  }
  async findId(id){
    return PeapleSchema.findById(id,'-__v');
  }
  async authenticate(email){
    return PeapleSchema.findOne({email:email});
  }
}

module.exports = new PeapleRepository;