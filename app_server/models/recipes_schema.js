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
    title : "Salmon a la plancha",
    author : "Paul Salazar",
    relatedIssues : ["Hipertension"],
    description : "Instrucciones para la preparacion",
    ingredients : ["2 tomates", "1/4 litro de leche", "cebolla", "2 piminetos", "2 pechugas de pollo", "1 taza de arroz"]
})

//recipe.save()