const JoiImport = require('joi');
const DateExtension = require ('@joi/date');

const Joi = JoiImport.extend(DateExtension);

module.exports = async (req,res,next) => {
  try{
    const CarSchema = Joi.object({
      nome: Joi.string().required().trim(),
      cpf: Joi.string().replace(/[^\d]/g, '').length(11).required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
      habilitado: Joi.string().valid('sim','não').required(),
    }); 

    const {error} = await CarSchema.validate(req.body,{abortEarl:true});
    if(error) throw error ;
    return next();
  }catch(error){
    if(error.message === '"ano" must be less than "1970-01-01T00:00:02.022Z"' || error.message === '"ano" must be greater than or equal to "1970-01-01T00:00:01.950Z"'){
      return res.status(400).json('"ano" must be greater than or equal to 1950 and must be less than 2022');
    }
    return res.status(400).json(error.message);

  }
};