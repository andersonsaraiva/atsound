const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const ProviderController = require('./app/controllers/ProviderController');
const BudgetController = require('./app/controllers/BudgetController');
const ServiceController = require('./app/controllers/ServiceController');

routes.post('/auth', AuthController.create);

routes.use(authMiddleware);

/**
 * Users routes
 */
routes
  .get('/users', UserController.index)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete);

/**
 * Providers routes
 */
routes
  .get('/providers', ProviderController.index)
  .post('/providers', ProviderController.create)
  .put('/providers/:id', ProviderController.update)
  .delete('/providers/:id', ProviderController.delete);

/**
 * Budgets routes
 */
routes
  .get('/budgets', BudgetController.index)
  .post('/budgets', BudgetController.create)
  .put('/budgets/:id', BudgetController.update)
  .delete('/budgets/:id', BudgetController.delete);

/**
 * Services routes
 */
routes
  .get('/services', ServiceController.index)
  .post('/budgets/:budget_id/services', ServiceController.create)
  .put('/services/:id', ServiceController.update)
  .delete('/services/:id', ServiceController.delete);

module.exports = routes;
