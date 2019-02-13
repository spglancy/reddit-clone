const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user');

router.get('/', (req, res) => {
    let currentUser = req.user
    Post.find().populate('author')
    .then(posts => {
        res.render('home', { 
            post: posts, 
            user: currentUser });
    }).catch(err => {
        console.log(err.message);
    })
})

router.put("/posts/:id/vote-up", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.upVotes.push(req.user._id);
      post.voteScore = post.voteScore + 1;
      post.save();
  
      res.status(200);
    });
  });

  router.put("/posts/:id/vote-down", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.downVotes.push(req.user._id);
      post.voteScore = post.voteScore - 1;
      post.save();
  
      res.status(200);
    });
  });

router.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).populate('author').lean()
        .then(posts => {
            res.render("home", { posts, currentUser: req.user });
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
        let post = new Post(req.body);
        post.author = req.user._id;
        post.upVotes = [];
        post.downVotes = [];
        post.voteScore = 0;

        post.save()
            .then(post => {
                return User.findById(post.author);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                return res.redirect(`/posts/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401) // UNAUTHORIZED
    }
})

router.get("/posts/:id", (req, res) => {
    console.log(req.params)
    Post.findById(req.params.id).populate('comments').lean()
    .then((post) => {
        res.render('post-view', { post })
      }).catch((err) => {
        console.log(err.message)
      })
});

module.exports = router