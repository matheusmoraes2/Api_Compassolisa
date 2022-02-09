const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const joiError = require('../JoiError')

module.exports = async (req,res,next) => {
  try{
    const CarSchema = Joi.object({
      id: Joi.objectId(),
      idAcessorio: Joi.objectId()
    }); 

    const {error} = await CarSchema.validate(req.params,{abortEarly:false});
    if(error) throw error ;
    return next();
  }catch(error){
    return res.status(400).json(joiError(error.details));
  }
};