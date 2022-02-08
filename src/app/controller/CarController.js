const CarService = require('../service/CarService');
const ErrorStatus = require('../error/ErrorStatus');

class CarController {
  async create(req,res){
    try{
      const data = await CarService.create(req.body);
      return res.status(201).json(data);
    }catch(error){
      return res.status(ErrorStatus(error)).json(error);
    }
  }

  async find(req,res){
    try{
      const {... query} = req.query;
      const data = await CarService.find(query);
      return res.status(200).json(data);
    }catch(error){
      return res.status(ErrorStatus(error)).json(error);
    }
  }

  async delete(req,res){
    try{
      const id = req.params.id;
      await CarService.delete(id);
      return res.status(204).end();            
    }catch(error){
      return res.status(ErrorStatus(error)).json(error);
    }
  }
  async put(req,res){
    try{
      const id = req.params.id;
      const dados = req.body;
      await CarService.put(id,dados);
      return res.status(204).end();
    }catch(error){
      res.status(ErrorStatus(error)).json(error);
    }
  }
  async findId(req,res){
    try{
      const id = req.params.id;
      const data = await CarService.findId(id);
      res.status(200).json(data);
    }catch(error){
      res.status(ErrorStatus(error)).json(error);
    }
  }
}

module.exports = new CarController;