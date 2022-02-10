const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RentalSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cnpj:{
        type: String,
        required: true,
        unique: true
    },
    atividades:{
        type: String,
        required: true
    },
    endereco:[{
        cep:{
            type: String,
            required: true
        },
        number:{
            type: String,
            required: true
        },
        isFilial:{
            type: Boolean,
            required: true
        },
        complemento:{
            type: String
        },
        logradouro:{
            type: String,
            required: true
        },
        bairro:{
            type:String,
            required: true
        },
        localidade:{
            type:String,
            required: true
        },
        uf:{
            type:String,
            required: true
        }
    }]
});

RentalSchema.plugin(mongoosePaginate);
const Rental = mongoose.model('Rental', RentalSchema);
        
module.exports = Rental;