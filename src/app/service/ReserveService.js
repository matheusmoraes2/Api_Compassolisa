const ReserverRepository = require('../repository/ReserveRepository');
const PeapleRepository = require('../repository/PeapleRepository');
const NotEnabled = require('../error/NotEnabled');

class ReserveService {
  async create(payload) {
    const habilitado = await PeapleRepository.findId(payload.id_user);
    if (habilitado.habilitado === 'não') {
      throw new NotEnabled();
    }
    const data = await ReserverRepository.create(payload);
    return data;
  }
}

module.exports = ReserveService;
