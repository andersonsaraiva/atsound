const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const ProviderController = require('./app/controllers/ProviderController');

routes.post('/auth', AuthController.create);

/**
 * Users routes
 */
routes
  .get('/users', UserController.index)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', authMiddleware, UserController.delete);

/**
 * Providers routes
 */
routes
  .get('/providers', ProviderController.index)
  .post('/providers', ProviderController.create)
  .put('/providers/:id', ProviderController.update)
  .delete('/providers/:id', authMiddleware, ProviderController.delete);

module.exports = routes;
