const PeapleService = require('../service/PeapleService');
const ErrorStatus = require('../error/ErrorStatus');

class PeapleController{
  async create(req,res){
    try{
      const data = await PeapleService.create(req.body);
      return res.status(201).json(data);
    }catch(error){
      return res.status(ErrorStatus(error)).json(error);
    }
  }
  async find(req,res){
    try{
      const {... query} = req.query;
      const data = await PeapleService.find(query);
      return res.status(200).json(data);  
    }catch(error){
      return res.status(ErrorStatus(error)).json(error);
    }
  }
  async put(req,res){
    try{
      const id = req.params.id;
      const data = req.body;
      await PeapleService.put(id,data);
      res.status(204).end();
    }catch(error){
      res.status(ErrorStatus(error)).json(error);
    }
  }
  async delete(req,res){
    try{
      const id = req.params.id;
      await PeapleService.delete(id);
      res.status(204).end();
    }catch(error){
      res.status(ErrorStatus(error)).json(error);
    }
  }
  async findId(req,res){
    try{
      const id = req.params.id;
      const data = await PeapleService.findId(id);
      res.status(200).json(data);
    }catch(error){
      res.status(ErrorStatus(error)).json(error);
    }
  }
  async login(req,res){
    try{
      const user = await PeapleService.login(req.body);
      res.status(200).send({ auth: true, user });
    }catch(error){
      res.status(ErrorStatus(error)).json(error);
    }
  }

}

module.exports = new PeapleController;