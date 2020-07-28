const Product = require('../models/Product');

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.findAll();

      return res.status(200).send(products);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o produtos!` });
    }
  }

  async create(req, res) {
    try {
      await Product.create(req.body);

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo produto!' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findOne({ where: { id } });

      if (product) await product.update(req.body);

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o produto do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Product.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover produto!' });
    }
  }
}

module.exports = new ProductController();
