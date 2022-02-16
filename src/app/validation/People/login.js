const Joi = require('joi');
const joiError = require('../JoiError');

module.exports = async (req, res, next) => {
  try {
    const PeopleSchema = Joi.object({
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required()
    });

    const { error } = await PeopleSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(joiError(error.details));
  }
};
