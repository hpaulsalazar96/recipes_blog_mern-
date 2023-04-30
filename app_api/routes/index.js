const express = require('express');
const router = express.Router();

//controllers imports
const ctrlUsers = require('../controllers/users')
const ctrlRecipes = require('../controllers/recipes')
const ctrlComments = require('../controllers/comments')

router
    .route('/users')
    .post(ctrlUsers.userCreate)
    .get(ctrlUsers.userList);

router
    .route('/users/:userid')
    .get(ctrlUsers.userRead)
    .put(ctrlUsers.userUpdate)
    .delete(ctrlUsers.userDelete);

router
    .route('/recipes')
    .post(ctrlRecipes.recipeCreate)
    .get(ctrlRecipes.recipeList);

router
    .route('/recipes/:recipeid')
    .get(ctrlRecipes.recipeRead)
    .post(ctrlComments.commentCreate)
    .put(ctrlRecipes.recipeUpdate)
    .delete(ctrlRecipes.recipeDelete);

router
    .route('/comments/:paramid')
    .delete(ctrlComments.commentDelete);

router
    .route('/comments/:recipeid/:commentid')
    .put(ctrlComments.commentUpdate)

router
    .route('/comments/delete/:commentid')
    .delete(ctrlComments.commentDelete);

router
    .route('/search/:username')
    .get(ctrlUsers.userLog);

router
    .route('/recipes/search/:filter')
    .get(ctrlRecipes.getRecipesByFilter);

module.exports = router;

