const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const Post = require('../models/post');
const User = require('../models/user')


router.post("/posts/:postId/comments", function(req, res) {
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  comment
      .save()
      .then(comment => {
          return Promise.all([
              Post.findById(req.params.postId)
          ]);
      })
      .then(([post, user]) => {
          post.comments.unshift(comment);
          return Promise.all([
              post.save()
          ]);
      })
      .then(post => {
          res.redirect(`/posts/${req.params.postId}`);
      })
      .catch(err => {
          console.log(err);
      });
  });


  //comment replies
  router.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p;
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {
        res.render("replies-new", { post, comment });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  router.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
    const reply = new Comment(req.body);
    reply.author = req.user._id
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
        .then(post => {
            // FIND THE CHILD COMMENT
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    comment.comments.unshift(reply._id);

                    return Promise.all([
                        comment.save(),
                    ]);
                })
                .then(() => {
                    res.redirect(`/posts/${req.params.postId}`);
                })
                .catch(console.error);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        })
  });

  module.exports = router