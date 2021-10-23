const Post = require('../models/Post')
const moment = require('moment')
const uuid = require('uuid')

exports.create = async (req, res) => {
    const now = moment().format('dddd, MMMM Do YYYY, h:mm a')
    try {
        await Post.create({
            id: uuid.v4(),
            title: req.body.title,
            content: req.body.content,
            createdAt: now,
            postCreator: req.session.username
        })
        return res.json({ success: 'Post submitted' })
    } catch (error) {
        return res.json({ error: error.message })
    }
}

exports.edit = async (req, res) => {
    try {
        Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            { where: {id: req.body.id }}
        )
        return res.json({ success: 'Successfully updated post' })
    } catch (error) {
        return res.json({ error: error.message })
    }
}

exports.delete = async (req, res) => {
    try {
        Post.destroy({ where: {id: req.params.id }})
        return res.json({ success: 'Successfully deleted post' })
    } catch (error) {
        return res.json({ error: error.message })
    }
}