const Joi = require('joi');
const joiError = require('../JoiError');

module.exports = async (req, res, next) => {
  try {
    const RentalSchema = Joi.object({
      nome: Joi.string().trim(),
      cnpj: Joi.string().replace(/[^\d]/g, '').length(14),
      atividades: Joi.string().trim(),
      cep: Joi.string().replace(/[^\d]/g, '').length(8),
      number: Joi.number(),
      isFilial: Joi.boolean(),
      complemento: Joi.string().trim()
    });

    const { error } = await RentalSchema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(joiError(error.details));
  }
};
