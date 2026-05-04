const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./cliente.model'); // Atualizado de User para Cliente
const Ativo = require('./ativo.model');

const Investimento = sequelize.define('Investimento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qtdeAtivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'qtde_ativo' // bate com o banco (qtdeAtivo → qtde_ativo)
    },
    valorMedio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'valor_medio' // bate com o banco (valorMedio → valor_medio)
    }
}, {
    tableName: 'carteira_cliente',
    timestamps: true,
    underscored: true
});

// foreignKeys corrigidas para bater com o banco
Investimento.belongsTo(Cliente, { foreignKey: 'cod_cliente' });
Investimento.belongsTo(Ativo, { foreignKey: 'cod_ativo' });

module.exports = Investimento;