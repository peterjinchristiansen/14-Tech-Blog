const Sequelize = require('sequelize')
const database = require('../config/database')
const bcrypt = require('bcrypt')

const User = database.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 20],
                msg: 'Username must be between 4 and 20 characters'
            },
            notNull: {
                msg: 'Please fill in the username field'
            },
            isUnique: async (value, next) => {
                await User.findOne({ where: { username: value }})
                    .then(data => {
                        if(data) {
                            return next('Username is already in use')
                        }
                        return next()
                    })
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 20],
                msg: 'Password must be between 4 and 20 characters'
            },
            notNull: {
                msg: 'Please fill in the password field'
            }
        }
    }
}, {
    timestamps: false
})


User.beforeCreate(async (user) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(user.password, salt)
    user.password = hashedPassword
})

User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = User