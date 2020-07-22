const { User } = require('../models');

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'username', 'email', 'role', 'createdAt', 'updatedAt']
      });

      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o usuários!` });
    }
  }

  async create(req, res) {
    try {
      const { name, username, email, password } = req.body;

      if (!!(await User.findOne({ where: { email } }))) {
        return res.status(400).send({ message: 'Erro ao criar novo usuário... Usuário já existe na base de dados!' });
      }

      await User.create({ name, username, email, password });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo usuário!' });
    }
  }

  async update(req, res) {
    const { name, username, email, password } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findOne({ where: { id } });

      if (user) await user.update({ name, username, email, password });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o usuário do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await User.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover usuário!' });
    }
  }
}

module.exports = new UserController();
