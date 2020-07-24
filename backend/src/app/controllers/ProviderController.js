const Provider = require('../models/Provider');

class ProviderController {
  async index(req, res) {
    try {
      const providers = await Provider.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'url']
      });

      return res.status(200).send(providers);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o fornecedores!` });
    }
  }

  async create(req, res) {
    try {
      const { name, email, phone, url } = req.body;

      if (!!(await Provider.findOne({ where: { email } }))) {
        return res
          .status(400)
          .send({ message: 'Erro ao criar novo fornecedor... já existe na base de dados com esse email!' });
      }

      await Provider.create({ name, email, phone, url });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo fornecedor!' });
    }
  }

  async update(req, res) {
    const { name, email, phone, url } = req.body;
    const { id } = req.params;

    try {
      const provider = await Provider.findOne({ where: { id } });

      if (provider) await provider.update({ name, email, phone, url });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o fornecedor do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Provider.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover fornecedor!' });
    }
  }
}

module.exports = new ProviderController();
