const mongoose = require('mongoose');
const recipes = mongoose.model('recipe');


const recipeCreate = (req, res) => {
    recipes.create({
        title: req.body.title,
        author: req.body.author,
        img: req.body.img,
        relatedIssues: req.body.relatedIssues,
        description: req.body.description,
        ingredients: req.body.ingredients,
        comments: req.body.comments,
    }, (err, recipeObject) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(recipeObject);
        }
    });
    
}

const recipeList = (req, res) => {
    recipes
        .find()
        .exec((err, recipeObject)=>{
            if(!recipeObject){
                console.log(`recetas no encontrados)`);
                return res
                    .status(404)
                    .json({"mensaje" : "recetas no encontrados"})
            }else if(err){
                console.log(`usuarios tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(recipeObject);
        })
    //res
    //    .status(200)
    //    .json({
    //        "status": "listed successfully"
    //    });
}

const recipeRead = (req, res) => {
    recipes
        .findById(req.params.recipeid)
        .exec((err, recipeObject)=>{
            if(!recipeObject){
                console.log(`receta especificado: ${req.params.recipeid} no encontrado)`);
                return res
                    .status(404)
                    .json({"mensaje" : "receta no encontrada"})
            }else if(err){
                console.log(`receta especificada: ${req.params.recipeid} tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
            .status(200)
            .json(recipeObject);
        })
}

const recipeUpdate = (req, res) => {
    if (!req.params.recipeid) {
        return res
            .status(404)
            .json({
                "message": "Ingrese un recipeid v??lido"
            });
    }
    recipes
        .findById(req.params.recipeid)
        .exec((err, recipeObject) => {
            if (!recipeObject) {
                return res
                    .status(404)
                    .json({
                        "message": "recipeid no existe"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            recipeObject.title = req.body.title;
            recipeObject.author = req.body.author;
            recipeObject.img = req.body.img;
            recipeObject.relatedIssues = req.body.relatedIssues;
            recipeObject.description = req.body.description;
            recipeObject.ingredients = req.body.ingredients;
            recipeObject.comments = req.body.comments;

            recipeObject.save((err, recipes) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(recipes);
                }
            });
        });
}

const recipeDelete = (req, res) => {
    if (req.params.recipeid) {
        recipes
            .findByIdAndDelete(req.params.recipeid)
            .exec((err, recipeObject) => {
                if (!recipeObject) { // findByIdAndDelete no encontr?? un documento que cumpla con recipeid
                    console.log(`Receta con el recipeid: ${req.params.recipeid} no encontrado`);
                    return res 
                        .status(404)
                        .json({"mensaje": "Receta no encontrado"});
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    }
}

module.exports = {
    recipeCreate, 
    recipeList,
    recipeRead,
    recipeUpdate,
    recipeDelete
}