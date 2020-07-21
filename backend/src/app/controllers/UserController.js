const { User } = require('../models');

class UserController {
  async index(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'username', 'email', 'role', 'createdAt', 'updatedAt']
      });

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, username, email, password } = req.body;

      if (!!(await User.findOne({ where: { email } }))) {
        return res.status(400).send({ message: 'Erro ao criar novo usuário... Usuário já existe na base de dados!' });
      }

      const user = await User.create({ name, username, email, password });

      delete user.password_hash;

      return res.status(201).json({ user, token: user.generateToken() });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { name, username, email, password } = req.body;
      const { id } = req.params;

      try {
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      // const { id } = req.params;
      // await knex('users').where({ id }).del();
      // return res.send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
