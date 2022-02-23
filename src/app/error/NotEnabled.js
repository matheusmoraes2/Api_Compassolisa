class NotEnabled extends Error {
  constructor() {
    super('User not enabled');
    this.description = 'Bad Request';
    this.name = 'User not enabled';
  }
}

module.exports = NotEnabled;
