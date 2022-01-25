const CarSchema = require('../schema/CarSchema')

class CarRepository {
    async create(payload){
        return CarSchema.create(payload)
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
        }
        const options = {
            page: 1,
            limit: 100,
            customLabels: myCustomLabels
        }

        const retorno = await CarSchema.paginate(payload,options,{})
        return retorno
    }
    async delete(id){
        await CarSchema.deleteOne({_id:id})
    }

}

module.exports = new CarRepository