const Joi = require('joi');
const joiError = require('../JoiError')

module.exports = async (req,res,next) => {
  try{
    const CarSchema = Joi.object({
        descricao: Joi.string().required(),
    }); 

    const {error} = await CarSchema.validate(req.body,{abortEarly:false});
    if(error) throw error ;
    return next();
  }catch(error){
    return res.status(400).json(joiError(error.details));
  }
};