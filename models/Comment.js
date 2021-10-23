const Sequelize = require('sequelize')
const database = require('../config/database')
const User = require('./User')
const Post = require('./Post')

const Comment = database.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 256],
                msg: 'Title must be between 1 and 256 characters'
            }
        }
    },
    createdAt: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'There was an error getting the date'
            }
        }
    },
    updatedAt: Sequelize.STRING
}, {
    timestamps: false
})

Comment.belongsTo(User, {
    foreignKey: 'commentCreator'
})

Comment.belongsTo(Post, {
    foreignKey: 'postParent'
})

module.exports = Comment