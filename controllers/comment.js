const Comment = require('../models/Comment')
const moment = require('moment')
const uuid = require('uuid')

exports.create = async (req, res) => {
    const now = moment().format('dddd, MMMM Do YYYY, h:mm a')
    try {
        await Comment.create({
            id: uuid.v4(),
            content: req.body.content,
            createdAt: now,
            postParent: req.body.postID,
            commentCreator: req.session.username
        })
        return res.json({ success: 'Comment submitted' })
    } catch (error) {
        return res.json({ error: error.message })
    }
}