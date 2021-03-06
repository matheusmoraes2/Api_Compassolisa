const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const joiError = require('../JoiError');

const Joi = JoiImport.extend(DateExtension);

module.exports = async (req, res, next) => {
  try {
    const PeopleSchema = Joi.object({
      nome: Joi.string().trim(),
      cpf: Joi.string().replace(/[^\d]/g, '').length(11),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw(),
      email: Joi.string().email(),
      habilitado: Joi.string().valid('sim', 'não')
    });

    const { error } = await PeopleSchema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(joiError(error.details));
  }
};
