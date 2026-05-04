const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

// ✅ Renomeado de 'User' para 'Cliente' para bater com o projeto
const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "O nome não pode estar vazio."}
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Insira um e-mail válido."},
            notEmpty: { msg: "O e-mail é obrigatório."}
        }
    },
    // ✅ Renomeado de 'password' para 'senha' para bater com o banco
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { args: [6, 100], msg: "A senha deve ter entre 6 e 100 caracteres."}
        }
    },
    saldo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'clientes',
    timestamps: true,
    underscored: true
});

module.exports = Cliente;