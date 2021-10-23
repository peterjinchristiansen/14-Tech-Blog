const Sequelize = require('sequelize')
const database = require('../config/database')
const User = require('./User')

const Post = database.define('post', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 40],
                msg: 'Title must be between 2 and 40 characters'
            }
        }
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 1000],
                msg: 'Content must be between 3 and 1000 characters'
            }
        }
    },
    postCreator: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'There was an error getting the date'
            }
        }
    }
})

module.exports = Post