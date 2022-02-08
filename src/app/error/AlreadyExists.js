class AlreadyExists extends Error {
  constructor(campo) {
    super(`${campo} Already Exists`);
    this.description = 'Already Exists'
    this.name = `${campo} Already Exists`;
  }
}

module.exports = AlreadyExists;