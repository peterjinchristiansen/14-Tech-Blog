const router = require('express').Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
    let allPosts = []
    await Post.findAll()
    .then(posts => {
        posts.forEach(async x => {
            let postComments = []
            await Comment.findAll({ where: { postParent: x.dataValues.id }})
                .then(comments => {
                    comments.forEach(x => {
                        postComments.push(x.dataValues)
                    })
                })
            let post = x.dataValues
            post['comments'] = postComments
            allPosts.push(post)
            console.log('1', allPosts)
        })
    })
    console.log('2', allPosts)
    res.render('home', {
        allPosts,
        loginStatus: req.session.isLoggedIn,
    })
})

router.get('/dashboard', async (req, res) => {
    let allPosts = []
    if(req.session.isLoggedIn) {
        await Post.findAll({ where: { postCreator: req.session.username }})
        .then(posts => {
            console.log(posts)
            posts.forEach(async x => {
                let postComments = []
                await Comment.findAll({ where: { postParent: x.dataValues.id }})
                    .then(comments => {
                        comments.forEach(x => {
                            postComments.push(x.dataValues)
                        })
                    })
                let post = x.dataValues
                post['comments'] = postComments
                allPosts.push(post)
                console.log(allPosts)
            })
        })
        res.render('dashboard', {
            allPosts: allPosts,
            loginStatus: req.session.isLoggedIn,
            username: req.session.username
        })
    } else {
        res.redirect('/')
    }

})

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