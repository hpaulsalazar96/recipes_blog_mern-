//controllers
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3020' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com' // server remoto - produccion
};

const index = (req, res, next) => {
  const path = '/api/recipes/';
  const requestOptions = { // objeto cargado con las opciones para request
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };

  request(requestOptions,
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        console.log('Objeto resultante: ', body);
        renderIndex(req, res, body);
      } else {
        console.log(response.statusCode);
        res.render('error', {
          message: 'Existe un error en la colección recetas'
        });
      }
    });
}

const renderIndex = (req, res, responseBody) => {
  res.render('recipes', {
    title: 'Recipes',
    recipes: responseBody
  });
}

const recipeCreate = (req, res, next) => {
  res.render('recipes_add', {
    title: 'Recipes',
    message: 'Healthy Meal On Comming!!!'
  });
}

const addRecipe = (req, res) => {
  const path = '/api/recipes/';
  let imageName = req.body.ingredients[0]
  if(Array.isArray(req.body.ingredients) && req.body.ingredients.length>1){
    imageName = req.body.ingredients[0]+".jpeg"
  }else{
    imageName = req.body.ingredients+".jpeg"
  }
  const postdata = {
    title: req.body.title,
    author: req.body.author,
    img: imageName,
    relatedIssues: req.body.relatedIssues,
    description: req.body.description,
    ingredients: req.body.ingredients
  }

  const requestOptions = { // objeto cargado con las opciones para request
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  request(requestOptions,
    (err, response, body) => {
      console.log('Opciones: ', requestOptions);
      if (response.statusCode === 201) { // creación exitosa
        console.log('Body: ', body);
        // volver a mostrar la vista users_add para el ingreso de más documentos
        return res.redirect('/');
      } else {
        console.log('statuscode: ', response.statusCode);
        console.log('error: ', err);
        console.log('req.body: ', req.body);
        console.log('Opciones: ', requestOptions);
        res.render('error', { message: 'Existe un error en la creación de usuarios' });
      }
    });
}

const getRecipe = (req, res, next) => {
  const path = `/api/recipes/${req.params.recipeId}`; // invoco a la ruta de la API para buscar por Id;
  console.log(req.params.recipeId);
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }
  console.log('Ruta: ', path);
  request(
    requestOptions, // Opciones
    (err, response, body) => { // callback con sus 3 partes
      console.log('Documento: ', body);
      console.log('Status Code: ', response.statusCode);
      if (err) {
        console.log('Request encontró el error: ', err);
      } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
        renderRecipe(req, res, body); // llamar a la función que hace render de la vista
      } else {
        console.log('Status Code: ', response.statusCode);
        res.render('error', {
          mensaje: 'Existe un error en la colección usuarios'
        })
      }
    });
}

const renderRecipe = (req, res, responseBody) => {
  res.render('recipe', {
    title: 'Recipes For You',
    recipe: responseBody,
  });
}

/*const recipeUpdate = (req, res, next) => {
    res.render('recipes', { 
      title: 'Recipes',
      recipes
    });
  }*/



const updateRecipe = (req, res, next) => {
  const path = `/api/recipes/${req.params.recipeId}`; // invoco a la ruta de la API para buscar por Id;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }
  console.log('Ruta: ', path);
  request(
    requestOptions, // Opciones
    (err, response, body) => { // callback con sus 3 partes
      console.log('Documento: ', body);
      console.log('Status Code: ', response.statusCode);
      if (err) {
        console.log('Request encontró el error: ', err);
      } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
        console.log('Objeto Resultante: ', typeof body);
        renderUpdateRecipe(req, res, body); // llamar a la función que hace render de la vista users_delete
      } else {
        console.log('Status Code: ', response.statusCode);
        res.render('error', {
          mensaje: 'Existe un error en la colección usuarios'
        })
      }
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
  let imageName = req.body.ingredients[0]
  if(Array.isArray(req.body.ingredients) && req.body.ingredients.length>1){
    imageName = req.body.ingredients[0]+".jpeg"
  }else{
    imageName = req.body.ingredients+".jpeg"
  }
  const postdata = {
    title: req.body.title,
    author: req.body.author,
    img: imageName,
    relatedIssues: req.body.relatedIssues,
    description: req.body.description,
    ingredients: req.body.ingredients
  }
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'PUT',
    json: postdata
  }
  console.log('Ruta: ', path);
  request(requestOptions,
    (err, response, body) => {
      console.log('Opciones: ', requestOptions);
      if (response.statusCode === 200) { // creación exitosa
        console.log('Body: ', body);
        // volver a mostrar la vista users_add para el ingreso de más documentos
        return res.redirect('/'); // retorno a la página de inicio
      } else {
        console.log('statuscode: ', response.statusCode);
        console.log('error: ', err);
        console.log('req.body: ', req.body);
        console.log('Opciones: ', requestOptions);
        res.render('error', { message: 'Existe un error en la creación de usuarios' });
      }
    });
}

const deleteRecipe = (req, res) => {
  const path = `/api/recipes/${req.params.recipeId}`; // invoco a la ruta de la API para buscar por Id;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }
  console.log('Ruta: ', path);
  request(
    requestOptions, // Opciones
    (err, response, body) => { // callback con sus 3 partes
      console.log('Documento: ', body);
      console.log('Status Code: ', response.statusCode);
      if (err) {
        console.log('Request encontró el error: ', err);
      } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
        console.log('Objeto Resultante: ', body);
        renderDeleteRecipe(req, res, body); // llamar a la función que hace render de la vista users_delete
      } else {
        console.log('Status Code: ', response.statusCode);
        res.render('error', {
          mensaje: 'Existe un error en la colección usuarios'
        })
      }
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
  const path = `/api/recipes/${req.params.recipeId}`; // invoco a la ruta de la API para eliminar por Id;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'DELETE',
    json: {}
  }
  console.log('Ruta: ', path);
  request(
    requestOptions, // Opciones
    (err, response, body) => { // callback con sus 3 partes
      console.log('Documento: ', body);
      console.log('Status Code: ', response.statusCode);
      if (err) {
        console.log('Request encontró el error: ', err);
      } else if (response.statusCode === 204) { // delete status code
        console.log('Body: ', body);
        return res.redirect('/'); // retorno a la página de inicio
      } else {
        console.log('Status Code: ', response.statusCode);
        res.render('error', {
          mensaje: 'Existe un error en la colección recetas'
        })
      }
    });
}


const filterRecipes = (req, res, next) => {
  const path = `/api/recipes/search/${req.params.filter}`; // invoco a la ruta de la API para buscar por Id;
  console.log(path);
  console.log(req.params.filter);
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }
  console.log('Ruta: ', path);
  request(
    requestOptions, // Opciones
    (err, response, body) => { // callback con sus 3 partes
      console.log('Documento: ', body);
      console.log('Status Code: ', response.statusCode);
      if (err) {
        console.log('Request encontró el error: ', err);
      } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
        console.log(body);
        renderFilteredRecipe(req, res, body); // llamar a la función que hace render de la vista
      } else {
        console.log('Status Code: ', response.statusCode);
        res.render('error', {
          mensaje: 'Existe un error en la colección usuarios'
        })
      }
    });
}

const renderFilteredRecipe = (req, res, responseBody) => {
  console.log("imprimir");
  console.log(responseBody);
  res.render('recipes', {
    title: 'Recipes',
    recipes: responseBody,
  });
}

const redirectSearch = (req, res) => {
  if (req.body.filter != "") {
    res.redirect(`/recipes/search/${req.body.filter}`);
  }else{
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