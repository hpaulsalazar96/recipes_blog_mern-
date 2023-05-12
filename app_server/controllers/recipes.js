const axios = require('axios')

let apiOptions = {
  server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const index = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }

  const path = '/api/recipes/';

  axios.get(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        renderIndex(req, res, response.data);
      }
    })
    .catch(error => {
      res.render('error', {
        message: 'Existe un error en la colección comentarios'
      });
    });
}

const renderIndex = (req, res, responseBody) => {
  res.render('recipes', {
    title: 'Recipes',
    recipes: responseBody,
    superuser: req.session.data.superuser,
  });
}

const recipeCreate = (req, res, next) => {

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }

  if (!req.session.data.superuser) {
    res.redirect('/recipes');
  }

  res.render('recipes_add', {
    title: 'Recipes',
    message: 'Healthy Meal On Comming!!!'
  });
}

const addRecipe = (req, res) => {
  const path = '/api/recipes/';
  let imageName = req.body.ingredients[0]
  if (Array.isArray(req.body.ingredients) && req.body.ingredients.length > 1) {
    imageName = req.body.ingredients[0] + ".jpeg"
  } else {
    imageName = req.body.ingredients + ".jpeg"
  }
  const postdata = {
    title: req.body.title,
    author: req.body.author,
    img: imageName,
    relatedIssues: req.body.relatedIssues,
    description: req.body.description,
    ingredients: req.body.ingredients
  }
  axios.post(`${apiOptions.server}${path}`, postdata)
    .then(response => {
      if (response.status === 201) {
        return res.redirect('/');
      }
    })
    .catch(error => {
      console.log('statuscode: ', response.status);
      console.log('error: ', error);
      console.log('Opciones: ', requestOptions);
      res.render('error', { message: 'Existe un error en la creación de usuarios' });
    });
}

const getRecipe = (req, res, next) => {

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }

  const path = `/api/recipes/${req.params.recipeId}`;
  axios.get(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        renderRecipe(req, res, response.data);
      }
    })
    .catch(error => {
      res.render('error', {
        message: 'Existe un error en la colección comentarios'
      });
    });
}

const renderRecipe = (req, res, responseBody) => {
  res.render('recipe', {
    title: 'Recipes For You',
    recipe: responseBody,
    superuser: req.session.data.superuser,
  });
}

const updateRecipe = (req, res, next) => {

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }

  if (!req.session.data.superuser) {
    res.redirect('/recipes');
  }

  const path = `/api/recipes/${req.params.recipeId}`;
  axios.get(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        renderUpdateRecipe(req, res, response.data);
      }
    })
    .catch(error => {
      res.render('error', {
        message: 'Existe un error en la colección comentarios'
      });
    });
}

// 0. Render de la vista users_update - Mostrar Formulario
const renderUpdateRecipe = (req, res, responseBody) => {
  res.render('recipes_update', {
    title: 'Update Recipe',
    message: 'Update Your Recipe',
    recipe: responseBody
  });
}

// 2. Eliminar el documento
const doUpdateRecipe = (req, res) => {
  const path = `/api/recipes/${req.params.recipeId}`; // invoco a la ruta de la API para eliminar por Id;
  if (Array.isArray(req.body.ingredients) && req.body.ingredients.length > 1) {
    imageName = req.body.ingredients[0] + ".jpeg"
  } else {
    imageName = req.body.ingredients + ".jpeg"
  }
  const postdata = {
    title: req.body.title,
    author: req.body.author,
    img: imageName,
    relatedIssues: req.body.relatedIssues,
    description: req.body.description,
    ingredients: req.body.ingredients
  }
  axios.put(`${apiOptions.server}${path}`, postdata)
    .then(response => {
      if (response.status === 200) {
        return res.redirect('/');
      }
    })
    .catch(error => {
      console.log('statuscode: ', response.status);
      console.log('error: ', error);
      console.log('Opciones: ', requestOptions);
      res.render('error', { message: 'Existe un error en la creación de usuarios' });
    });
}

const deleteRecipe = (req, res) => {

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }

  if (!req.session.data.superuser) {
    res.redirect('/recipes');
  }

  const path = `/api/recipes/${req.params.recipeId}`;
  axios.get(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        renderDeleteRecipe(req, res, response.data);
      }
    })
    .catch(error => {
      console.log('statuscode: ', response.status);
      console.log('error: ', error);
      console.log('Opciones: ', requestOptions);
      res.render('error', { message: 'Existe un error en la creación de usuarios' });
    });
}

// Eliminación de usuarios 

// 0. Render de la vista users_delete - Mostrar Formulario
const renderDeleteRecipe = (req, res, responseBody) => {
  res.render('recipes_delete', {
    title: 'Delete Recipe',
    message: 'Delete this Recipe',
    recipe: responseBody
  });
}


// 2. Eliminar el documento
const doDeleteRecipe = (req, res) => {
  const path = `/api/recipes/${req.params.recipeId}`;
  axios.delete(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 204) {
        return res.redirect('/');
      }
    })
    .catch(error => {
      console.log('statuscode: ', response.status);
      console.log('error: ', error);
      console.log('Opciones: ', requestOptions);
      res.render('error', { message: 'Existe un error en la creación de usuarios' });
    });
}


const filterRecipes = (req, res, next) => {

  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }

  const path = `/api/recipes/search/${req.params.filter}`;
  axios.get(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        renderFilteredRecipe(req, res, response.data);
      }
    })
    .catch(error => {
      console.log('statuscode: ', response.status);
      console.log('error: ', error);
      console.log('Opciones: ', requestOptions);
      res.render('error', { message: 'Existe un error en la creación de usuarios' });
    });
}

const renderFilteredRecipe = (req, res, responseBody) => {
  res.render('recipes', {
    title: 'Recipes',
    recipes: responseBody,
  });
}

const redirectSearch = (req, res) => {
  if (req.body.filter != "") {
    res.redirect(`/recipes/search/${req.body.filter}`);
  } else {
    res.redirect(`/recipes`);
  }
}


module.exports = {
  index,
  recipeCreate,
  getRecipe,
  addRecipe,
  updateRecipe,
  doUpdateRecipe,
  deleteRecipe,
  doDeleteRecipe,
  filterRecipes,
  redirectSearch
};