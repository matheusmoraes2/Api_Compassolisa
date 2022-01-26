const PeapleRepository = require('../repository/PeapleRepository')

class PeapleService{
    async create(payload){
        const data = await PeapleRepository.create(payload)
        return data
    }

}

module.exports = new PeapleService