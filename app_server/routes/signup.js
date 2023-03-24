const express = require('express');
const router = express.Router();

//controllers imports
const ctrlSignup = require('../controllers/signup')

/* GET signup page. */
router
    .route('/')    
    .get(ctrlSignup.index)
    .post(ctrlSignup.addUser);

module.exports = router;