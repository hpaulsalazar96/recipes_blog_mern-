const express = require('express');
const router = express.Router();

//controllers imports
const ctrlProfile = require('../controllers/profile')

/* GET profile page. */
router.get('/', ctrlProfile.index);

module.exports = router;