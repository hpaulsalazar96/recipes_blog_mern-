const express = require('express');
const router = express.Router();

//controllers imports
const ctrlRecipe = require('../controllers/recipe')

/* GET recipe page. */
router.get('/', ctrlRecipe.index);

router.get('/create', ctrlRecipe.recipeCreate);

router.get('/read', ctrlRecipe.recipeRead);

router.get('/update', ctrlRecipe.recipeUpdate);

router.get('/delete', ctrlRecipe.recipeDelete);

module.exports = router;