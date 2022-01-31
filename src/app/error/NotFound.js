class NotFound extends Error {
  constructor(object) {
    super(`${object} Not found`);
    this.name = 'NotFound';
    this.idErro = 0;
  }
}

module.exports = NotFound;