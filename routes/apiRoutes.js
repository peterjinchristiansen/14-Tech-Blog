const router = require('express').Router()
const userControl = require('../controllers/user')
const postControl = require('../controllers/post')
const commentControl = require('../controllers/comment')

router.post('/users/register', userControl.register)
router.post('/users/login', userControl.login)
router.post('/users/logout', userControl.logout)

router.post('/posts/create', postControl.create)
router.put('/posts/edit', postControl.edit)
router.delete('/posts/delete/:id', postControl.delete)

router.post('/comments/create', commentControl.create)

module.exports = router