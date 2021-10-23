const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
    let allPosts = []
    let allComments = []
    const findPosts = await Post.findAll({ order: [['updatedAt', 'ASC']] })
    const findComments = await Comment.findAll({ order: [['updatedAt', 'ASC']] })
    findPosts.forEach(post => {
        allPosts.push(post.dataValues)
    })
    findComments.forEach(comment => {
        allComments.push(comment.dataValues)
    })
    let allPostsModified = []
    allPosts.forEach(post => {
        let thisPostsComments = []
        for(i = 0; i < allComments.length; i++) {
            if(post.id === allComments[i].postParent) {
                thisPostsComments.push(allComments[i])
            }
        }
        post['comments'] = thisPostsComments
        allPostsModified.push(post)
    })
    res.render('home', {
        loginStatus: req.session.isLoggedIn,
        allPosts: allPostsModified
    })
});

router.get('/dashboard', async (req, res) => {
    if(req.session.isLoggedIn) {
        let allPosts = []
        let allComments = []
        const findPosts = await Post.findAll(
            { where: { postCreator: req.session.username }},
            { order: [['updatedAt', 'ASC']] }
        )
        const findComments = await Comment.findAll({ order: [['updatedAt', 'ASC']] })
    
        findPosts.forEach(post => {
            allPosts.push(post.dataValues)
        })
        findComments.forEach(comment => {
            allComments.push(comment.dataValues)
        })
        let allPostsModified = []
        allPosts.forEach(post => {
            let thisPostsComments = []
            for(i = 0; i < allComments.length; i++) {
                if(post.id === allComments[i].postParent) {
                    thisPostsComments.push(allComments[i])
                }
            }
            post['comments'] = thisPostsComments
            allPostsModified.push(post)
        })
        console.log(req.session.username)
        res.render('dashboard', {
            loginStatus: req.session.isLoggedIn,
            allPosts: allPostsModified,
            username: req.session.username
        })
    } else {
        res.redirect('/')
    }
});

router.get('/login', (req, res) => {
    if(req.session.isLoggedIn) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

router.get('/register', (req, res) => {
    if(req.session.isLoggedIn) {
        res.redirect('/')
    } else {
        res.render('register')
    }
})

module.exports = router