const JoiImport = require('joi');
const DateExtension = require('@joi/date');
const joiError = require('../JoiError');

const Joi = JoiImport.extend(DateExtension);

module.exports = async (req, res, next) => {
  try {
    const CarSchema = Joi.object({
      modelo: Joi.string().trim().required(),
      cor: Joi.string().trim().required(),
      ano: Joi.date().raw().less('2023').min('1950').required(),
      acessorios: Joi.array()
        .items(
          Joi.object({
            descricao: Joi.string().required()
          }).required()
        )
        .unique('descricao')
        .required(),
      quantidadePassageiros: Joi.number().required()
    });

    const { error } = await CarSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(joiError(error.details));
  }
};
