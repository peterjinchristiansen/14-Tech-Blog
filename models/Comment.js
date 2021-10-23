const Sequelize = require('sequelize')
const database = require('../config/database')
const User = require('./User')
const Post = require('./Post')

const Comment = database.define('comment', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: 'Title must be between 1 and 255 characters'
            }
        }
    },
    postParent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    commentCreator: {
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

module.exports = Comment