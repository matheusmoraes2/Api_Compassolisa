const RentalSchema = require('../schema/RentalSchema')

class RentalRepository{
    async create(payload){
        return RentalSchema.create(payload);
    }
    async findCnpj(cnpj){
        return RentalSchema.findOne({cnpj:cnpj});
    }
}

module.exports = new RentalRepository