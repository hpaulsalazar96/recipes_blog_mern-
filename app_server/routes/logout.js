const express = require('express');
const router = express.Router();

//controllers imports
const ctrlLogout = require('../controllers/logout')

/* GET login page. */
router
    .route('/')
    .get(ctrlLogout.index)

module.exports = router;