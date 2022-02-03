const Joi = require('joi');

module.exports = async (req,res,next) => {
  try{
    const CarSchema = Joi.object({
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
    }); 

    const {error} = await CarSchema.validate(req.body,{abortEarl:true});
    if(error) throw error ;
    return next();
  }catch(error){
    return res.status(400).json(error.message);
  }
};