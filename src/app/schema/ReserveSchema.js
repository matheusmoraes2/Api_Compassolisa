const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReserveSchema = mongoose.Schema({
  id_user: {
    type: String,
    required: true
  },
  data_inicio: {
    type: String,
    required: true
  },
  data_fim: {
    type: String,
    required: true
  },
  id_carro: {
    type: String,
    required: true
  },
  id_locadora: {
    type: String,
    required: true
  },
  valor_final: {
    type: Number,
    required: true
  }
});

ReserveSchema.plugin(mongoosePaginate);
const Reserve = mongoose.model('Reserve', ReserveSchema);

module.exports = Reserve;
