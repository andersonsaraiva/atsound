const Employee = require('../models/Employee');

class EmployeeController {
  async index(req, res) {
    try {
      const employees = await Employee.findAll();

      return res.status(200).send(employees);
    } catch (error) {
      return res.status(400).send({ message: `Erro ao buscar o fornecedores!` });
    }
  }

  async create(req, res) {
    const { cpf } = req.body;

    try {

      if (!!(await Employee.findOne({ where: { cpf } }))) {
        return res.status(400).send({ message: 'Erro ao criar novo funcionário... CPF já existe na base de dados!' });
      }

      await Employee.create(req.body);

      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao criar novo fornecedor!' });
    }
  }

  async update(req, res) {
    const { id, cpf } = req.params;

    try {
      if (!!(await Employee.findOne({ where: { cpf } }))) {
        return res.status(400).send({ message: 'Erro ao criar novo funcionário... CPF já existe na base de dados!' });
      }

      const employee = await Employee.findOne({ where: { id } });

      if (employee) await employee.update(req.body);

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: `Erro ao atualizar o fornecedor do id: ${id}!` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Employee.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ message: 'Erro ao remover fornecedor!' });
    }
  }
}

module.exports = new EmployeeController();
