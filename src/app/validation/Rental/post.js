const Joi = require('joi');
const joiError = require('../JoiError');

module.exports = async (req, res, next) => {
  try {
    const RentalSchema = Joi.object({
      nome: Joi.string().trim().required(),
      cnpj: Joi.string().replace(/[^\d]/g, '').length(14).required(),
      atividades: Joi.string().trim().required(),
      endereco: Joi.array()
        .items(
          Joi.object({
            cep: Joi.string().replace(/[^\d]/g, '').length(8).required(),
            number: Joi.number().required(),
            isFilial: Joi.boolean().required(),
            complemento: Joi.string().trim()
          }).required()
        )
        .required()
    });

    const { error } = await RentalSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(joiError(error.details));
  }
};
