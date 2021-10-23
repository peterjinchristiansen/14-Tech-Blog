const Comment = require('../models/Comment')
const moment = require('moment')

exports.create = async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            createdAt: moment().format('dddd, MMMM Do YYYY, h:mm a'),
            postParent: req.body.postID,
            commentCreator: req.session.username
        })
        return res.json({ success: 'Comment submitted' })
    } catch (error) {
        return res.json({ error: error.message })
    }
}