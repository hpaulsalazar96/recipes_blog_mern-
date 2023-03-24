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
    .put(ctrlRecipes.recipeUpdate)
    .delete(ctrlRecipes.recipeDelete);
    
router
    .route('/:recipeid/comments')
    .post(ctrlComments.commentCreate)
    .get(ctrlComments.commentList);

router
    .route('/recipes/:recipeid/:commentid')
    .get(ctrlComments.commentRead)
    .put(ctrlComments.commentUpdate)
    .delete(ctrlComments.commentDelete);

router 
    .route('/search/:username')
    .get(ctrlUsers.userLog);

module.exports = router;

