const { User } = require('../models');

class UserController {
  async index(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'username', 'createdAt', 'updatedAt']
      });

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // const { username } = req.body;
      // await knex('users').insert({ username });
      // return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      // const { username } = req.body;
      // const { id } = req.params;
      // await knex('users').update({ username }).where({ id });
      // return res.send();
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
