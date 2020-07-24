const Budget = require('../models/Budget');

class BudgetController {
  async index(req, res) {
    try {
      const budgets = await Budget.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'cpf', 'date']
      });

      return res.status(200).send(budgets);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o orçamentos!` });
    }
  }

  async create(req, res) {
    try {
      const { name, email, phone, cpf, date } = req.body;

      await Budget.create({ name, email, phone, cpf, date });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo orçamento!' });
    }
  }

  async update(req, res) {
    try {
      const { name, email, phone, cpf, date } = req.body;
      const { id } = req.params;

      const budget = await Budget.findOne({ where: { id } });

      if (budget) await budget.update({ name, email, phone, cpf, date });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o orçamento do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Budget.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover orçamento!' });
    }
  }
}

module.exports = new BudgetController();
