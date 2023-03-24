const mongoose = require('mongoose');
const comments = mongoose.model('comment');

const commentCreate = (req, res) => {
    comments.create({
        author: req.body.author,
        score: req.body.score,
        content: req.body.content,
        recipeReference: req.params.recipeid,
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




const commentList = (req, res) => {
    comments
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

const commentRead = (req, res) => {
    comments
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
            res
                .status(200)
                .json(recipeObject);
        })
}

const commentUpdate = (req, res) => {
    let commentid = (req.params.paramId.split("-"))[1]
    let recipeid = (req.params.paramId.split("-"))[0]
    if (!recipeid) {
        return res
            .status(404)
            .json({
                "message": "Ingrese un recipeid válido"
            });
    }
    recipes
        .findById(recipeid)
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
            recipeObject.author = req.body.author;
            recipeObject.content = req.body.content;
            recipeObject.score = req.body.score;
            recipeObject.recipeReference = commentid;

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

const commentDelete = (req, res) => {
    if (req.params.commentid) {
        comments
            .findByIdAndDelete(req.params.commentid)
            .exec((err, recipeObject) => {
                if (!recipeObject) { // findByIdAndDelete no encontró un documento que cumpla con recipeid
                    console.log(`Receta con el recipeid: ${req.params.commentid} no encontrado`);
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
    commentCreate,
    commentList,
    commentRead,
    commentUpdate,
    commentDelete
}