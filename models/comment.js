const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const CommentSchema = new Schema({
    content: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

CommentSchema
    .pre('find', Populate('author'))
    .pre('find', Populate('comments'))

module.exports = mongoose.model("Comment", CommentSchema);