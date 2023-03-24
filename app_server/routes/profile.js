const express = require('express');
const router = express.Router();

//controllers imports
const ctrlProfile = require('../controllers/profile')

/* GET profile page. */
router
    .route('/')
    .get(ctrlProfile.index)
    .post(ctrlProfile.onAction);

module.exports = router;