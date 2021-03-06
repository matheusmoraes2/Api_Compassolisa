const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const joiError = require('../JoiError');

const Joi = JoiImport.extend(DateExtension);

module.exports = async (req, res, next) => {
  try {
    const CarSchema = Joi.object({
      modelo: Joi.string().trim(),
      cor: Joi.string().trim(),
      ano: Joi.date().raw().less('2023').min('1950'),
      acessorio: Joi.string().trim(),
      quantidadePassageiros: Joi.number()
    });

    const { error } = await CarSchema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    // if(error.message === '\"ano\" must be less than or equal to \"1970-01-01T00:00:02.022Z\"'){
    //  return res.status(400).json('\"ano\" must be less than or equal to \"2022"');
    // }
    // if(error.message === '"ano" must be greater than or equal to "1970-01-01T00:00:01.950Z"'){
    //  return res.status(400).json('"ano" must be greater than or equal to "1950"');
    // }
    return res.status(400).json(joiError(error.details));
  }
};
