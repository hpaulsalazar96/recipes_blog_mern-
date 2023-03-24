const express = require('express');
const router = express.Router();

//controllers imports
const ctrlLogin = require('../controllers/login')

/* GET login page. */
router
    .route('/')
    .get(ctrlLogin.index)
    .post(ctrlLogin.getUser);

module.exports = router;