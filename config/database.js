const Sequelize = require('sequelize')
require('dotenv').config()

if(process.env.JAWSDB_URL) {
    database = new Sequelize(process.env.JAWSDB_URL)
} else {
    database = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: 'localhost',
        dialect: 'mysql',
    })
}

module.exports = database