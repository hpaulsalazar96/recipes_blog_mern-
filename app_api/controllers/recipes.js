const mongoose = require('mongoose');
const recipes = mongoose.model('recipe');
const comments = mongoose.model('comment');


const recipeCreate = (req, res) => {
    recipes.create({
        title: req.body.title,
        author: req.body.author,
        img: req.body.img,
        relatedIssues: req.body.relatedIssues,
        description: req.body.description,
        ingredients: req.body.ingredients,
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
        .exec((err, recipeObject) => {
            if (!recipeObject) {
                console.log(`recetas no encontrados)`);
                return res
                    .status(404)
                    .json({ "mensaje": "recetas no encontrados" })
            } else if (err) {
                console.log(`usuarios tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(recipeObject);
        })
}

const recipeRead = (req, res) => {
    recipes
        .findById(req.params.recipeid)
        .exec((err, recipeObject) => {
            if (!recipeObject) {
                console.log(`receta especificado: ${req.params.recipeid} no encontrado)`);
                return res
                    .status(404)
                    .json({ "mensaje": "receta no encontrada" })
            } else if (err) {
                console.log(`receta especificada: ${req.params.recipeid} tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            const buscar = new RegExp(req.params.recipeid); // permite buscar la ocurrencia de un texto en un campo. Ej.: parte de un nombre
            console.log(`Buscar usuario con nombre: ', ${buscar}`)
            comments
                // .find({ 'nombre' : buscar }) // búsqueda por ocurrencia
                .find({
                    'recipeReference': req.params.recipeid // permite buscar el valor exacto en un campo. Ej.: el valor de la identificación
                }) // obtener todos los documentos de la coleccion que cumplen con el criterio de busqueda
                .exec((err, commentsObject) => {
                    if (!commentsObject || commentsObject.length == 0) { // find no encontro el documentos en la coleccion
                        console.log(`No existen documentos con nombre ${buscar}`);
                        let n_key = 'comments';
                        let n_val = [];
                        recipeObject.n_key = n_val;
                        const concatdata = {
                            _id: recipeObject._id,
                            title: recipeObject.title,
                            author: recipeObject.author,
                            img: recipeObject.img,
                            relatedIssues: recipeObject.relatedIssues,
                            description: recipeObject.description,
                            ingredients: recipeObject.ingredients,
                            __v: recipeObject.__v,
                            comments: []
                        }
                        return res
                            .status(200)
                            .json(concatdata);
                    } else if (err) { // find encontro un error
                        console.log(`Se encontro un error en la coleccion ${users} con nombre: ${buscar}`);
                        return res
                            .status(200)
                            .json(recipeObject);
                    }
                    console.log(`Se encontró el documento referente a la receta con id:  ${req.params.recipeid}`);
                    let n_key = 'comments';
                    let n_val = commentsObject;
                    recipeObject.n_key = n_val;
                    const concatdata = {
                        _id: recipeObject._id,
                        title: recipeObject.title,
                        author: recipeObject.author,
                        img: recipeObject.img,
                        relatedIssues: recipeObject.relatedIssues,
                        description: recipeObject.description,
                        ingredients: recipeObject.ingredients,
                        __v: recipeObject.__v,
                        comments: commentsObject
                    }
                    res // respondo los documentos encontrados en formato JSON y status HTTP 200
                        .status(200)
                        .json(concatdata);
                });
        })
}

const recipeUpdate = (req, res) => {
    if (!req.params.recipeid) {
        return res
            .status(404)
            .json({
                "message": "Ingrese un recipeid válido"
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
                if (!recipeObject) { // findByIdAndDelete no encontró un documento que cumpla con recipeid
                    console.log(`Receta con el recipeid: ${req.params.recipeid} no encontrado`);
                    return res
                        .status(404)
                        .json({ "mensaje": "Receta no encontrado" });
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