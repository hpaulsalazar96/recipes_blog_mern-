const express = require('express');
const router = express.Router();

//controllers imports
const ctrlLogin = require('../controllers/login')

/* GET login page. */
router.get('/', ctrlLogin.index);

module.exports = router;