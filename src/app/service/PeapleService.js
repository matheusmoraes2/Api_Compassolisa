const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const PeapleRepository = require('../repository/PeapleRepository');
const NotFound = require('../error/NotFound');
const InvalidBody = require('../error/InvalidBody');
const LoginError = require('../error/LoginError');
const AlreadyExists = require('../error/AlreadyExists');
require('dotenv').config();

class PeapleService {
  async create(payload) {
    await this.verifyEmailSenha(payload.email, payload.cpf);
    this.validateData(payload.data_nascimento);
    const data = await PeapleRepository.create(payload);
    return data;
  }

  async find(query) {
    let object = query;
    if (query.hasOwnProperty('nome')) {
      const nome = { nome: { $regex: `.*${query.nome}.*` } };
      delete query.nome;
      object = { ...query, ...nome };
    }
    const data = await PeapleRepository.find(object);
    // if (data.Peaple.length === 0) {
    //  if (query.length === 0) {
    //    return data;
    //  }

    //  throw new NotFound(JSON.stringify(query));
    // }
    return data;
  }

  async put(id, payload) {
    await this.verifyEmailSenha(payload.email, payload.cpf);
    this.validateData(payload.data_nascimento);

    const data = await PeapleRepository.put(id, payload);
    if (data === null) throw new NotFound(`Id:'${id}'`);
  }

  async delete(id) {
    const data = await PeapleRepository.delete(id);
    if (data === null) throw new NotFound(`Id:'${id}'`);
  }

  async findId(id) {
    const data = await PeapleRepository.findId(id);
    if (data === null) {
      throw new NotFound(`Id:'${id}'`);
    } else {
      return data;
    }
  }

  async login(payload) {
    const { senha } = payload;
    const { email } = payload;
    const data = await PeapleRepository.authenticate(email);
    if (data === null || !(await bcrypt.compare(senha, data.senha))) {
      throw new LoginError();
    }
    const token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '24h'
    });
    const Obj = { token, email: data.email, habilitado: data.habilitado };
    return Obj;
  }

  async verifyEmailSenha(email, cpf) {
    const dataEmail = await PeapleRepository.authenticate(email);
    const dataCpf = await PeapleRepository.verifyCpf(cpf);

    if (dataEmail !== null) {
      throw new AlreadyExists(`Email: ${email}`);
    }
    if (dataCpf !== null) {
      throw new AlreadyExists(`Cpf: ${cpf}`);
    }
  }

  validateData(data) {
    const Formatdata = moment(data, 'DD/MM/YYYY');
    const nascY = new Date(Formatdata).getFullYear();
    const nascM = new Date(Formatdata).getMonth();
    const nascD = new Date(Formatdata).getDate();
    const dataY = new Date().getFullYear();
    const dataM = new Date().getMonth();
    const dataD = new Date().getDate();
    const anoDiff = dataY - nascY;
    const mesDiff = dataM - nascM;
    const diaDiff = dataD - nascD;
    if (anoDiff < 18 || (anoDiff === 18 && mesDiff < 0) || (anoDiff === 18 && mesDiff === 0 && diaDiff < 0)) {
      throw new InvalidBody(`you must be at least 18 years old. data_nascimento: '${data}',`);
    }
  }
}

module.exports = new PeapleService();
