const mongoose = require('mongoose');
const users = mongoose.model('user');


const userCreate = (req, res) => {
    res
        .status(200)
        .json({
            "status": "created successfully"
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
    res
        .status(200)
        .json({
            "status": "Update action successfully"
        });
}

const userDelete = (req, res) => {
    res
        .status(200)
        .json({
            "status": "Delete action successfully"
        });
}

module.exports = {
    userCreate, 
    userList,
    userRead,
    userUpdate,
    userDelete
}