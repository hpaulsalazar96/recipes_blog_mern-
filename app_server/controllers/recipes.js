//controllers

let recipes = [
    {
        title: 'Recipe 1',
        img: '1.jpg',
        content:"Lorem Ipsum Dolor atem",
    },
    {
        title: 'Recipe 2',
        img: '2.jpg',
        content:"Lorem Ipsum Dolor atem",
    },
    {
        title: 'Recipe 3',
        img: '3.jpg',
        content:"Lorem Ipsum Dolor atem",
    },
    {
        title: 'Recipe 4',
        img: '4.jpg',
        content:"Lorem Ipsum Dolor atem",
    },
]

const index = (req, res, next) => {
    res.render('recipes', { 
      title: 'Recipes',
      recipes 
    });
  }

const recipeCreate = (req, res, next) => {
    res.render('recipes', { title: 'Recipes' });
  }

const recipeRead = (req, res, next) => {
    res.render('recipes', { title: 'Recipes' });
  }

const recipeDelete = (req, res, next) => {
    res.render('recipes', { title: 'Recipes' });
  }

const recipeUpdate = (req, res, next) => {
    res.render('recipes', { title: 'Recipes' });
  }

module.exports = {
    index,
    recipeCreate,
    recipeRead,
    recipeDelete,
    recipeUpdate,
};