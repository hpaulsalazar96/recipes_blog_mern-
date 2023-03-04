const mongoose = require('mongoose');
const users = mongoose.model('user');


const userCreate = (req, res) => {
    users.create({
        username: req.body.username,
        email: req.body.email,
        relatedIssues: req.body.relatedIssues,
        password: req.body.password,
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
        .exec((err, userObject)=>{
            if(!userObject){
                console.log(`usuarios no encontrados)`);
                return res
                    .status(404)
                    .json({"mensaje" : "usuarios no encontrados"})
            }else if(err){
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
        .exec((err, userObject)=>{
            if(!userObject){
                console.log(`usuario especificado: ${req.params.userid} no encontrado)`);
                return res
                    .status(404)
                    .json({"mensaje" : "usuario no encontrado"})
            }else if(err){
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
                        .json({"mensaje": "User no encontrado"});
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
    userCreate, 
    userList,
    userRead,
    userUpdate,
    userDelete
}