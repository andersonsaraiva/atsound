const Event = require('../models/Event');

class EventController {
  async index(req, res) {
    try {
      const events = await Event.findAll();

      return res.status(200).send(events);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar os eventos!` });
    }
  }

  async create(req, res) {
    try {
      await Event.create(req.body);

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo evento!' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const event = await Event.findOne({ where: { id } });

      if (event) await event.update(req.body);

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o fornecedor do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Event.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover fornecedor!' });
    }
  }
}

module.exports = new EventController();
