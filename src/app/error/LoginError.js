class LoginError extends Error {
  constructor() {
    super('Invalid login or password');
    this.description = 'Bad Request';
    this.name = 'Invalid login or password';
  }
}

module.exports = LoginError;
