const AlreadyExists = require('./AlreadyExists');
const NotFound = require('./NotFound');
const InvalidBody = require('./InvalidBody');
const LoginError = require('./LoginError');
const isFilialDuplicate = require('./IsFilialDuplicate');
const NotEnabled = require('./NotEnabled');

module.exports = (error) => {
  let status = 500;
  if (error instanceof NotFound) {
    status = 404;
  }
  if (error instanceof InvalidBody) {
    status = 400;
  }
  if (error instanceof AlreadyExists) {
    status = 400;
  }
  if (error instanceof LoginError) {
    status = 500;
  }
  if (error instanceof isFilialDuplicate) {
    status = 400;
  }
  if (error instanceof NotEnabled) {
    status = 400;
  }

  return status;
};
