const mongoose = require('mongoose');
const comments = mongoose.model('comment');

const commentCreate = (req, res) => {
    comments.create({
        author: req.body.author,
        score: req.body.score,
        content: req.body.content,
        recipeReference: req.params.recipeid,
    }, (err, commentObject) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(commentObject);
        }
    });

}

const commentList = (req, res) => {
    comments
        .find()
        .exec((err, commentObject) => {
            if (!commentObject) {
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
                .json(commentObject);
        })
}

const commentRead = (req, res) => {
    comments
        .findById(req.params.recipeid)
        .exec((err, commentObject) => {
            if (!commentObject) {
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
                .json(commentObject);
        })
}

const commentUpdate = (req, res) => {
    if (!req.params.commentid) {
        return res
            .status(404)
            .json({
                "message": "Ingrese un recipeid válido"
            });
    }
    comments
        .findById(req.params.commentid)
        .exec((err, commentObject) => {
            if (!commentObject) {
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
            commentObject.author = req.body.author;
            commentObject.content = req.body.content;
            commentObject.score = req.body.score;
            commentObject.recipeReference = req.params.recipeid;

            commentObject.save((err, comment) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(comment);
                }
            });
        });
}

const commentDelete = (req, res) => {
    if (req.params.commentid) {
        comments
            .findByIdAndDelete(req.params.commentid)
            .exec((err, commentObject) => {
                if (!commentObject) { // findByIdAndDelete no encontró un documento que cumpla con recipeid
                    console.log(`Receta con el recipeid: ${req.params.commentid} no encontrado`);
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
    commentCreate,
    commentList,
    commentRead,
    commentUpdate,
    commentDelete
}