const mongoose = require('mongoose');

const recipesSchema= new mongoose.Schema({
    title : {
        type : String,
        require: true
    },
    author : {
        type : String,
        require: true
    },
    img: {
        type : String,
        require: true
    },
    relatedIssues : {
        type : [String],
    },
    description : {
        type : String,
        require: true
    },
    ingredients : {
        type : [String],
    },
})

const RecipeModel = new mongoose.model('recipe', recipesSchema);

const recipe = new RecipeModel({
    title : "Fruta Repetida",
    author : "PSV",
    img: 'Fruta.jpg',
    relatedIssues : ["Hipertension"],
    description : "Instrucciones para la preparacion",
    ingredients : ["Fruta"],
})

//recipe.save()