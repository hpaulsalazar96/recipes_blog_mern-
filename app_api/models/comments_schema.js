const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    author : {
        type : String,
        require: true
    },
    content : {
        type : String,
        require: true
    },
    score : {
        type : Number,
    },
    recipeReference : {
        type : String
    }
}) 

const CommentModel = new mongoose.model('comment', commentsSchema);

const comment = new CommentModel({
    author : "640b44038a7b6f92f51ef0be",
    content : "Me gusto mucho",
    score : 3,
    recipeReference : "12312312312312312312131"
})

//comment.save() 