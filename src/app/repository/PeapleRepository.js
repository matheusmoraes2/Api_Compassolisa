const PeapleSchema = require('../schema/PeapleSchema')

class PeapleRepository{
    async create(payload){
        return PeapleSchema.create(payload)
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
        }
        const options = {
            page: 1,
            limit: 100,
            customLabels: myCustomLabels
        }

        const retorno = await PeapleSchema.paginate(payload,options,{})
        return retorno
    }
}

module.exports = new PeapleRepository