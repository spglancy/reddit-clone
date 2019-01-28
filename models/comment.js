const mongoose = require('mongoose');

const comment = mongoose.model('Comment', {
    postId: String,
    content: String
});

module.exports = Post;