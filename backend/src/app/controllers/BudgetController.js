const Budget = require('../models/Budget');

class BudgetController {
  async index(req, res) {
    try {
      const budgets = await Budget.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'cpf', 'date']
      });

      return res.status(200).send(budgets);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o fornecedores!` });
    }
  }

  async create(req, res) {
    try {
      const { name, email, phone, url } = req.body;

      if (!!(await Budget.findOne({ where: { email } }))) {
        return res
          .status(400)
          .send({ message: 'Erro ao criar novo fornecedor... já existe na base de dados com esse email!' });
      }

      await Budget.create({ name, email, phone, url });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo fornecedor!' });
    }
  }

  async update(req, res) {
    const { name, email, phone, url } = req.body;
    const { id } = req.params;

    try {
      const budget = await Budget.findOne({ where: { id } });

      if (budget) await budget.update({ name, email, phone, url });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o fornecedor do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Budget.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover fornecedor!' });
    }
  }
}

module.exports = new BudgetController();
