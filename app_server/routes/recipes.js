const express = require('express');
const router = express.Router();

//controllers imports
const ctrlRecipe = require('../controllers/recipes')

/* GET recipe page. */
router.get('/', ctrlRecipe.index);

router
    .route('/create')
    .get(ctrlRecipe.recipeCreate)
    .post(ctrlRecipe.addRecipe);

router.get('/read', ctrlRecipe.recipeRead);

//router.get('/update', ctrlRecipe.recipeUpdate);

router.get('/delete', ctrlRecipe.recipeDelete);

module.exports = router;