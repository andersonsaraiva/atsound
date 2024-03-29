const Service = require('../models/Service');
const Budget = require('../models/Budget');

class ServiceController {
  async index(req, res) {
    const { budget_id } = req.params;

    try {
      const services = await Service.findAll({ where: { budget_id } });

      return res.status(200).send(services);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o serviços!`, error });
    }
  }

  async create(req, res) {
    try {
      const { budget_id } = req.params;

      const budget = await Budget.findByPk(budget_id);

      if (!budget) {
        return res.status(400).send({ message: `Erro ao buscar o orçamento do id: ${budget_id}!` });
      }

      await Service.create({ budget_id, ...req.body });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo serviço!' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const service = await Service.findOne({ where: { id } });

      if (service) await service.update(req.body);

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
