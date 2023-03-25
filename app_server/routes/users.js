const express = require('express');
const router = express.Router();

//controllers imports
const ctrlUsers = require('../controllers/users')

/* GET users listing. */
router.get('/', ctrlUsers.users);

/* Creación de usuarios - render de la vista users_add */
router.get('/add', ctrlUsers.addUsers);

/* Creación de usuarios - petición HTT POST /users */
router.post('/add', ctrlUsers.doAddUsers);

module.exports = router;