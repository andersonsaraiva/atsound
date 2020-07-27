const Customer = require('../models/Customer');
const Car = require('../models/Car');

class CarController {
  async index(req, res) {
    const { customer_id } = req.params;

    try {
      const cars = await Car.findAll({ where: { customer_id } });

      return res.status(200).send(cars);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o veículos!`, error });
    }
  }

  async create(req, res) {
    try {
      const { customer_id } = req.params;

      const customer = await Customer.findByPk(customer_id);

      if (!customer) {
        return res.status(400).send({ message: `Erro ao buscar o cliente do id: ${customer_id}!` });
      }

      const car = await Car.create({ customer_id, ...req.body });

      return res.status(201).send(car);
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo veículo!' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const car = await Car.findOne({ where: { id } });

      if (car) await car.update(req.body);

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o veículo do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Car.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover veículo!' });
    }
  }
}

module.exports = new CarController();
