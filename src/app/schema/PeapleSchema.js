const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PeapleSchema = mongoose.Schema({
nome: {
    type: String,
    required: true
},
cpf: {
    type: String,
    required: true
},
data_nascimento: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},

senha: {
    type: String,
    required: true
},
habilitado: {
    type: String,
    required: true,
    enum : ['sim','não']
}

})

PeapleSchema.plugin(mongoosePaginate)
const Peaple = mongoose.model('Peaple', PeapleSchema)
        
module.exports = Peaple