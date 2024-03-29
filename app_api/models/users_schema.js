const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    relatedIssues: {
        type: [String],
    },
    password: {
        type: String,
        require: true
    },
    superuser: {
        type: Boolean,
        require: true,
        'default': false
    },
})

const UserModel = new mongoose.model('user', usersSchema);

const user = new UserModel({
    username: "hmendez",
    email: "hmendez@dev.com",
    relatedIssues: ["Hipertension"],
    password: "nonsecure1",
    superuser: true
})


//user.save()