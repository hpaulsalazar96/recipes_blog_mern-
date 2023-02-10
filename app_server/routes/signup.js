const express = require('express');
const router = express.Router();

//controllers imports
const ctrlSignup = require('../controllers/signup')

/* GET signup page. */
router.get('/', ctrlSignup.index);

module.exports = router;