const express = require('express')
const postRoutes = express.Router()
const Post = require('../models/post')

postRoutes.post('/posts/new', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

module.exports = postRoutes