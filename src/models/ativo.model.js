const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Ativo = sequelize.define('Ativo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codAtivo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        field: 'cod_ativo' // vamos garnte a sicronia com o banco
    },
    nomeAtivo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nome_ativo'
    },
    qtdeAtivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'qtde_ativo'
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
},{
   tableName: 'ativos',
   timestamps: true,
   underscored: true
})

module.exports = Ativo;