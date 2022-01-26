const { Router } = require('express')
const carRouter = require('./car.router')
const peapleRouter = require('./peaple.router')

module.exports = server => {
  server.use((req, res, next) => {
    carRouter(server, new Router());
    peapleRouter(server, new Router());
    next();
  });
};