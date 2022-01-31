class AlreadyExists extends Error {
  constructor(campo) {
    super(`${campo} Already Exists`);
    this.name = 'AlreadyExists';
    this.idErro = 2;
  }
}

module.exports = AlreadyExists;