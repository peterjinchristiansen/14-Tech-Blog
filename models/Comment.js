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
    createdAt: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'There was an error getting the date'
            }
        }
    },    
    updatedAt: {
        type: Sequelize.STRING,
        allowNull: false
    } 
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