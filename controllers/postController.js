const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render("home", { posts });
    }).catch(err => {
        console.log(err.message);
    });
})

router.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("home", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });

router.get('/post-new', (req, res) => {
    res.render('new-post')
})

router.post('/posts/new', (req, res) => {
    Post.create(req.body);
    res.redirect('/')
})

router.get("/posts/:id", (req, res) => {
    console.log(req.params)
    Post.findById(req.params.id)
        .then(post => {
            console.log(post)
            res.render("post-view", { post });
        })
        .catch(err => {
            console.log(err.message);
        });
});

module.exports = router