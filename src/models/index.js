const sequelize = require('../config/database');
require('./cliente.model');
require('./ativo.model');
require('./investimento.model');

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error.message);
    throw error;
  }
};

module.exports = { syncDatabase };