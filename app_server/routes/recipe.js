const express = require('express');
const router = express.Router();

//controllers imports
const ctrlRecipe = require('../controllers/recipe')

/* GET recipe page. */
router.get('/', ctrlRecipe.index);

module.exports = router;