const { Router } = require('express')
const carRouter = require('./car.router')

module.exports = server => {
  server.use((req, res, next) => {
    carRouter(server, new Router());
    next();
  });
};