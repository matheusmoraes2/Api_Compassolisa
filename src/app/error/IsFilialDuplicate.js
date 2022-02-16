class isFilialDuplicate extends Error {
  constructor() {
    super(`There can only be 1 'isFilial:false'`);
    this.description = 'Bad Request';
    this.name = `There can only be 1 'isFilial:false'`;
  }
}

module.exports = isFilialDuplicate;
