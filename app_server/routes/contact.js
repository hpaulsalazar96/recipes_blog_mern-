const express = require('express');
const router = express.Router();

//controllers imports
const ctrlContact = require('../controllers/contact')

/* GET contact page. */
router.get('/', ctrlContact.index);

module.exports = router;