const Cliente = require('../models/cliente.model');

const create = async (dadosCliente) => {
  return await Cliente.create(dadosCliente);
};

const findAll = async () => {
  return await Cliente.findAll({ attributes: { exclude: ['senha'] } });
};

const findById = async (id) => {
  return await Cliente.findByPk(id, { attributes: { exclude: ['senha'] } });
};

module.exports = { create, findAll, findById };