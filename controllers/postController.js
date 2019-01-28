const express = require('express')
const postRoutes = express.Router()
const Post = require('../models/post')

postRoutes.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render("home", { posts });
    }).catch(err => {
        console.log(err.message);
    });
})

postRoutes.post('/posts/new', (req, res) => {
    Post.create(req.body);
    res.redirect('/')
})

postRoutes.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.render("post-view", { post });
        })
        .catch(err => {
            console.log(err.message);
        });
});

module.exports = postRoutes