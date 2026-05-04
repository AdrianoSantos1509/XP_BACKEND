const Ativo = require('../models/ativo.model');

const findAll = async () => {
  return await Ativo.findAll();
};

const findById = async (id) => {
  return await Ativo.findByPk(id);
};

module.exports = { findAll, findById };