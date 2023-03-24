const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    user : {
        type : String,
        require: true
    },
    description : {
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
    user : "640b44038a7b6f92f51ef0be",
    description : "Me gusto mucho",
    score : 15.5,
    recipeReference : "12312312312312312312131"
})

//comment.save() 