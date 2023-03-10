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
    comments : {
        type : [String],
    },
})

const RecipeModel = new mongoose.model('recipe', recipesSchema);

const recipe = new RecipeModel({
    title : "Tilapia al ajillo",
    author : "Paul Salazar",
    img: '2.jpg',
    relatedIssues : ["Hipertension"],
    description : "Instrucciones para la preparacion",
    ingredients : ["2 tomates", "1/4 litro de leche", "cebolla", "2 piminetos", "2 pechugas de pollo", "1 taza de arroz"],
    comments : ["640b4432081a2afbf9fd8ddf"]
})

recipe.save()