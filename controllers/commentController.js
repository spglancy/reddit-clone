const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const Post = require('../models/post');
const User = require('../models/user')

router.post("/posts/:postId/comments", function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
    comment.author = req.user._id
  
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return User.findById(comment.author);
      }).then(user => {
        user.comments.unshift(comment);
                user.save();
      })
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(post => {
        res.redirect(`/posts/${post._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports = router