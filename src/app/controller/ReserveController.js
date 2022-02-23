const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const data = ReserveService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = ReserveController;
