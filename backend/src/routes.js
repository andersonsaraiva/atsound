const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');

routes
  .get('/users', UserController.index)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', authMiddleware, UserController.delete);

routes.post('/auth', AuthController.create);

module.exports = routes;
