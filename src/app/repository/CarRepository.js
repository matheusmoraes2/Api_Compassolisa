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
    async findId(id){
        return CarSchema.findOne({_id:id},'-__v')
    }
    async delete(id){
        await CarSchema.deleteOne({_id:id})
    }
    async put(id,payload,acessorio){
        await CarSchema.updateOne({_id:id},{$push:acessorio})
        await CarSchema.updateOne({_id:id},payload)
    }

}

module.exports = new CarRepository