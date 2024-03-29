const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const ProviderController = require('./app/controllers/ProviderController');
const BudgetController = require('./app/controllers/BudgetController');
const ServiceController = require('./app/controllers/ServiceController');
const CustomerController = require('./app/controllers/CustomerController');
const CarController = require('./app/controllers/CarController');
const EmployeeController = require('./app/controllers/EmployeeController');
const ProductController = require('./app/controllers/ProductController');
const EventController = require('./app/controllers/EventController');

routes.post('/auth', AuthController.create);

/**
 * Users routes
 */
routes
  .get('/users', UserController.index)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete);

routes.use(authMiddleware);

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
  .get('/services/:budget_id', ServiceController.index)
  .post('/budgets/:budget_id/services', ServiceController.create)
  .put('/services/:id', ServiceController.update)
  .delete('/services/:id', ServiceController.delete);

/**
 * Customers routes
 */
routes
  .get('/customers', CustomerController.index)
  .post('/customers', CustomerController.create)
  .put('/customers/:id', CustomerController.update)
  .delete('/customers/:id', CustomerController.delete);

/**
 * Cars routes
 */
routes
  .get('/cars/:customer_id', CarController.index)
  .post('/customers/:customer_id/cars', CarController.create)
  .put('/cars/:id', CarController.update)
  .delete('/cars/:id', CarController.delete);

/**
 * Employees routes
 */
routes
  .get('/employees', EmployeeController.index)
  .post('/employees', EmployeeController.create)
  .put('/employees/:id', EmployeeController.update)
  .delete('/employees/:id', EmployeeController.delete);

/**
 * Products routes
 */
routes
  .get('/products', ProductController.index)
  .post('/products', ProductController.create)
  .put('/products/:id', ProductController.update)
  .delete('/products/:id', ProductController.delete);

/**
 * Events routes
 */
routes
  .get('/events', EventController.index)
  .post('/events', EventController.create)
  .put('/events/:id', EventController.update)
  .delete('/events/:id', EventController.delete);

module.exports = routes;
