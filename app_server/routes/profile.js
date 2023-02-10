const express = require('express');
const router = express.Router();

//controllers imports
const ctrlProfile = require('../controllers/profile')

/* GET profile page. */
router.get('/', ctrlProfile.index);

router.get('/update', ctrlProfile.profileUpdate);

router.get('/delete', ctrlProfile.profileDelete);

module.exports = router;