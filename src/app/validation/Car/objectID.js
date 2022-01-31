const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (req,res,next) =>{
  try {
    if(!(ObjectId.isValid(req.params.id))) throw new Error();
    return next();
  } catch (error) {
    return res.status(400).json(`ObjectId:'${req.params.id}' is invalid`);
                
  }
};