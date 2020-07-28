const Customer = require('../models/Customer');

class CustomerController {
  async index(req, res) {
    try {
      const customers = await Customer.findAll();
      // include: { association: 'cars' }

      return res.status(200).send(customers);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o clientes!` });
    }
  }

  async create(req, res) {
    try {
      const customer = await Customer.create(req.body);

      return res.status(201).send(customer);
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo cliente!' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const customer = await Customer.findOne({ where: { id } });

      if (customer) await customer.update(req.body);

      return res.status(200).send(customer);
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o cliente do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Customer.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover cliente!' });
    }
  }
}

module.exports = new CustomerController();
