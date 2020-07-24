const Service = require('../models/Service');

// budget_id
// description
// price
class ServiceController {
  async index(req, res) {
    try {
      const budgets = await Service.findAll({
        attributes: ['id', 'budget_id', 'description', 'price']
      });

      return res.status(200).send(budgets);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o serviços!` });
    }
  }

  async create(req, res) {
    try {
      const { budget_id, description, price } = req.body;

      await Service.create({ budget_id, description, price });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo serviço!' });
    }
  }

  async update(req, res) {
    const { budget_id, description, price } = req.body;
    const { id } = req.params;

    try {
      const service = await Service.findOne({ where: { id } });

      if (service) await service.update({ budget_id, description, price });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o serviço do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Service.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover serviço!' });
    }
  }
}

module.exports = new ServiceController();
