const PeapleSchema = require('../schema/PeapleSchema')

class PeapleRepository{
    async create(payload){
        return PeapleSchema.create(payload)
    }

}

module.exports = new PeapleRepository