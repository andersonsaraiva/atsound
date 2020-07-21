const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const results = await knex("users");

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { username } = req.body;

      await knex("users").insert({ username });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
