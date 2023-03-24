const express = require('express');
const router = express.Router();

//controllers imports
const ctrlRecipe = require('../controllers/recipes')
const ctrlComment = require('../controllers/comments')


/* GET recipe page. */
router.get('/', ctrlRecipe.index);

router
    .route('/add')
    .get(ctrlRecipe.recipeCreate)
    .post(ctrlRecipe.addRecipe);

router
    .route('/read/:recipeId')
    .get(ctrlRecipe.getRecipe)
    .post(ctrlComment.onAction);

router
    .route('/read/:recipeId/:commentId')
    .get(ctrlComment.addComment)

router
    .route('/comments/delete/:commentId')
    .get(ctrlComment.deleteComment)

router
    .route('/update/:recipeId')
    .get(ctrlRecipe.updateRecipe)
    .post(ctrlRecipe.doUpdateRecipe);

router
    .route('/delete/:recipeId')
    .get(ctrlRecipe.deleteRecipe)
    .post(ctrlRecipe.doDeleteRecipe);

module.exports = router;