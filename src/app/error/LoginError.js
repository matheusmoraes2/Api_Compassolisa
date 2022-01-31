class LoginError extends Error {
  constructor() {
    super('Invalid login or password');
    this.name = 'LoginError';
    this.idErro = 1;
  }
}

module.exports = LoginError;