const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user');

router.get('/', (req, res) => {
    var currentUser = req.user;
    console.log(req.cookies);
    Post.find().populate('author')
    .then(posts => {
        res.render('home', { posts, currentUser });
    }).catch(err => {
        console.log(err.message);
    })
})

router.get("/n/:subreddit", function(req, res) {
    const currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).populate('author')
        .then(posts => {
            res.render("home", { posts, currentUser });
        })
        .catch(err => {
            console.log(err);
        });
  });

router.get('/post-new', (req, res) => {
    res.render('new-post')
})

router.post('/posts/new', (req, res) => {
    if (req.user) {
        const post = new Post(req.body);
        post.author = req.user._id;

        post.save()
            .then(post => {
                return User.findById(post.author);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/posts/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
})

router.get("/posts/:id", (req, res) => {
    console.log(req.params)
    Post.findById(req.params.id).populate('comments').then((post) => {
        res.render('post-view', { post })
      }).catch((err) => {
        console.log(err.message)
      })
});

module.exports = router