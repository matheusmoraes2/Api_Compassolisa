class InvalidBody extends Error {
  constructor(erro) {
    super(`${erro} is invalid`);
    this.description = 'Bad Request';
    this.name = `${erro} is invalid`;
  }
}

module.exports = InvalidBody;
