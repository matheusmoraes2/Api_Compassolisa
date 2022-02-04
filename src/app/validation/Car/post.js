const JoiImport = require('joi');
const DateExtension = require ('@joi/date');

const Joi = JoiImport.extend(DateExtension);

module.exports = async (req,res,next) => {
  try{
    const CarSchema = Joi.object({
      modelo: Joi.string().trim().required(),
      cor: Joi.string().trim().required(),
      ano: Joi.date().raw().max('2022').min('1950').required(),
      acessorios: Joi.array().items(Joi.object({
        descricao: Joi.string().required()
      }).required()).unique('descricao').required(),
      quantidadePassageiros: Joi.number().required()
    }); 

    const {error} = await CarSchema.validate(req.body,{abortEarl:true});
    if(error) throw error ;
    return next();
  }catch(error){
    if(error.message === '\"ano\" must be less than or equal to \"1970-01-01T00:00:02.022Z\"'){
      return res.status(400).json('\"ano\" must be less than or equal to \"2022"');
    }
    if(error.message === '"ano" must be greater than or equal to "1970-01-01T00:00:01.950Z"'){
      return res.status(400).json('"ano" must be greater than or equal to "1950"');
    }
    return res.status(400).json(error.message);

  }
};