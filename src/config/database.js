const { Sequelize } = require('sequelize')
require('dotenv').config({ path: __dirname + '/../.env' })

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
})

module.exports = sequelize