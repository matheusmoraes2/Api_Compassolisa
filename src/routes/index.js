const { Router } = require('express');
const carRouter = require('./car.router');
const peapleRouter = require('./peaple.router');
const loginRouter = require('./login.router');
const rentalRouter = require('./rental.router');
const reserveRouter = require('./reserve.router');

module.exports = (server) => {
  server.use((req, res, next) => {
    carRouter(server, new Router());
    peapleRouter(server, new Router());
    loginRouter(server, new Router());
    rentalRouter(server, new Router());
    reserveRouter(server, new Router());
    next();
  });
};
