const mongoose = require('mongoose');
const recipes = mongoose.model('recipe');


const recipeCreate = (req, res) => {
    res
        .status(200)
        .json({
            "status": "created successfully"
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
    res
        .status(200)
        .json({
            "status": "Update action successfully"
        });
}

const recipeDelete = (req, res) => {
    res
        .status(200)
        .json({
            "status": "Delete action successfully"
        });
}

module.exports = {
    recipeCreate, 
    recipeList,
    recipeRead,
    recipeUpdate,
    recipeDelete
}