const mongoose = require('mongoose');
const users = mongoose.model('user');


const userCreate = (req, res) => {
    users.create({
        username: req.body.username,
        email: req.body.email,
        relatedIssues: req.body.relatedIssues,
        password: req.body.password,
        superuser: req.body.superuser
    }, (err, userObject) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(userObject);
        }
    });
}

const userList = (req, res) => {
    users
        .find()
        .exec((err, userObject) => {
            if (!userObject) {
                console.log(`usuarios no encontrados)`);
                return res
                    .status(404)
                    .json({ "mensaje": "usuarios no encontrados" })
            } else if (err) {
                console.log(`usuarios tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(userObject);
        })
    //res
    //    .status(200)
    //    .json({
    //        "status": "listed successfully"
    //    });
}

const userRead = (req, res) => {
    users
        .findById(req.params.userid)
        .exec((err, userObject) => {
            if (!userObject) {
                console.log(`usuario especificado: ${req.params.userid} no encontrado)`);
                return res
                    .status(404)
                    .json({ "mensaje": "usuario no encontrado" })
            } else if (err) {
                console.log(`usuario especificado: ${req.params.userid} tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(userObject);
        })
}

const userUpdate = (req, res) => {
    if (!req.params.userid) {
        return res
            .status(404)
            .json({
                "message": "Ingrese un userid válido"
            });
    }
    users
        .findById(req.params.userid)
        .exec((err, userObject) => {
            if (!userObject) {
                return res
                    .status(404)
                    .json({
                        "message": "userid no existe"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            userObject.username = req.body.username;
            userObject.email = req.body.email;
            userObject.relatedIssues = req.body.relatedIssues;
            userObject.password = req.body.password;
            userObject.superuser = req.body.superuser;

            userObject.save((err, users) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(users);
                }
            });
        });
}

const userDelete = (req, res) => {
    if (req.params.userid) {
        users
            .findByIdAndDelete(req.params.userid)
            .exec((err, userObject) => {
                if (!userObject) { // findByIdAndDelete no encontró un documento que cumpla con userid
                    console.log(`User con el userid: ${req.params.userid} no encontrado`);
                    return res
                        .status(404)
                        .json({ "mensaje": "User no encontrado" });
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

const userLog = (req, res) => {
    const search = new RegExp(req.params.username); // permite buscar la ocurrencia de un texto en un campo. Ej.: parte de un nombre
    console.log(`Buscar usuario con nombre: ', ${search}`)
    users
        // .find({ 'nombre' : buscar }) // búsqueda por ocurrencia
        .find({
            'username': req.params.username // permite buscar el valor exacto en un campo. Ej.: el valor de la identificación
        }) // obtener todos los documentos de la coleccion que cumplen con el criterio de busqueda
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario || objetoUsuario.length == 0) { // find no encontro el documentos en la coleccion
                console.log(`No existen documentos con nombre ${search}`);
                return res // respondo el mensaje en formato JSON y status HTTP 404
                    .status(404)
                    .json({
                        "Mensaje": "Usuario no encontrado"
                    });
            } else if (err) { // find encontro un error
                console.log(`Se encontro un error en la coleccion ${users} con nombre: ${search}`);
                return res // respondo el error en formato JSON y status HTTP 404
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontró el documento con nombre ${req.params.username}`);
            res // respondo los documentos encontrados en formato JSON y status HTTP 200
                .status(200)
                .json(objetoUsuario);
        });
}

module.exports = {
    userCreate,
    userList,
    userRead,
    userUpdate,
    userDelete,
    userLog
}