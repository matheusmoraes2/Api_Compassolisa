const JoiImport = require('joi');
const DateExtension = require ('@joi/date');

const Joi = JoiImport.extend(DateExtension);
const joiError = require('../JoiError')

module.exports = async (req,res,next) => {
  try{
    const PeopleSchema = Joi.object({
      nome: Joi.string().trim().required(),
      cpf: Joi.string().replace(/[^\d]/g, '').length(11).required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
      habilitado: Joi.string().valid('sim','não').required(),
    }); 

    const {error} = await PeopleSchema.validate(req.body,{abortEarly:false});
    if(error) throw error ;
    return next();
  }catch(error){
    return res.status(400).json(joiError(error.details));
  }
};