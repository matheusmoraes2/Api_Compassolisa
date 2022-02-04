const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = async (req,res,next) => {
  try{
    const CarSchema = Joi.object({
      id: Joi.objectId()
    }); 

    const {error} = await CarSchema.validate(req.params,{abortEarl:true});
    if(error) throw error ;
    return next();
  }catch(error){
    return res.status(400).json(error.message);
  }
};