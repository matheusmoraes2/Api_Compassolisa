const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    return RentalSchema.create(payload);
  }

  async findCnpj(cnpj) {
    return RentalSchema.findOne({ cnpj });
  }

  async find(query) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Rental',
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

    const retorno = await RentalSchema.paginate(query, options, {});
    return retorno;
  }

  async findId(id) {
    return RentalSchema.findById(id);
  }

  async put(id, payload) {
    return RentalSchema.findOneAndUpdate({ _id: id }, payload);
  }

  async delete(id) {
    return RentalSchema.findOneAndDelete({ _id: id });
  }
}

module.exports = new RentalRepository();
