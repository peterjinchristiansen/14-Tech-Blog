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
        })
    })
    res.render('home', {
        allPosts,
        loginStatus: req.session.isLoggedIn,
    })
})

router.get('/dashboard', async (req, res) => {
    let allPosts = []
    console.log('FIRST TEST => ', req.session.isLoggedIn)
    if(req.session.isLoggedIn) {
        console.log('SECOND TEST => ', req.session.username)
        await Post.findAll({ where: { postCreator: req.session.username }})
        .then(posts => {
            console.log('THIRD TEST => ', posts)
            posts.forEach(async x => {
                let postComments = []
                await Comment.findAll({ where: { postParent: x.dataValues.id }})
                    .then(comments => {
                        console.log('FOURTH TEST => ', comments)
                        comments.forEach(x => {
                            postComments.push(x.dataValues)
                        })
                    })
                let post = x.dataValues
                post['comments'] = postComments
                allPosts.push(post)
                console.log('FIFTH TEST => ', allPosts)
            })
        })
        res.render('dashboard', {
            allPosts,
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