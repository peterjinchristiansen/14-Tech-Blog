const User = require('../models/User')
const uuid = require('uuid')

exports.register = async (req, res) => {
    if(req.body.password !== req.body.password2) {
        return res.json({ error: 'Passwords do not match' })
    }
    try {
        await User.create({
            id: uuid.v4(),
            username: req.body.username,
            password: req.body.password
        }, {
            isNewRecord: true
        }).then(result => {
            req.session.save(() => {
                req.session.username = result.dataValues.username
                req.session.isLoggedIn = true
                return res.json({ success: `User '${req.body.username}' has been created` })
            })
        })
    } catch (error) {
        return res.json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    const findUser = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if(!findUser) {
        return res.json({ error: `No user '${req.body.username}' exists` })
    }
    if(!await findUser.validPassword(req.body.password)) {
        return res.json({ error: 'Passwords do not match' })
    }
    req.session.save(() => {
        req.session.id = findUser.id
        req.session.username = findUser.username
        req.session.isLoggedIn = true
        return res.json({ success: 'Successfully logged in' })
    })
    .catch(error => {
        return res.json({ error: error.message })
    })
}

exports.logout = async (req, res) => {
    try {
        await req.session.destroy()
        return res.json({ success: 'Successfully logged out' })
    } catch (error) {
        return res.json({ error: error.message })
    }
}