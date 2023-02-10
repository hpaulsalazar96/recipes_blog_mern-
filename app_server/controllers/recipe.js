//controllers

const index = (req, res, next) => {
    res.render('recipe', { title: 'Recipe' });
  }

const recipeCreate = (req, res, next) => {
    res.render('recipe', { title: 'Recipe' });
  }

const recipeRead = (req, res, next) => {
    res.render('recipe', { title: 'Recipe' });
  }

const recipeDelete = (req, res, next) => {
    res.render('recipe', { title: 'Recipe' });
  }

const recipeUpdate = (req, res, next) => {
    res.render('recipe', { title: 'Recipe' });
  }

module.exports = {
    index,
    recipeCreate,
    recipeRead,
    recipeDelete,
    recipeUpdate,
};