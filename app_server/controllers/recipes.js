//controllers
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3020' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com' // server remoto - produccion
};

let recipes = [
  {
    title: 'Recipe 1',
    author: 'Manuel A',
    img: '1.jpg',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
    items: [
      {
        name: 'sal 1 Cucharada'
      },
      {
        name: 'pechuga de pollo 500mg'
      },
    ],
    related_issues: [
      {
        description: 'Diabetes 1'
      },
      {
        description: 'Hipertension'
      },
    ]
  },
  {
    title: 'Recipe 2',
    author: 'Manuel A',
    img: '2.jpg',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
    items: [
      {
        name: 'sal'
      },
      {
        name: 'pechuga de pollo'
      },
    ],
    related_issues: [
      {
        description: 'Diabetes 2'
      },
    ]
  },
  {
    title: 'Recipe 3',
    author: 'Manuel A',
    img: '3.jpg',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
    items: [
      {
        name: 'sal'
      },
      {
        name: 'pechuga de pollo'
      },
    ],
    related_issues: [
      {
        description: 'Hipertension'
      },
    ]
  },
  {
    title: 'Recipe 4',
    author: 'Manuel A',
    img: '4.jpg',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
    items: [
      {
        name: 'sal'
      },
      {
        name: 'pechuga de pollo'
      },
    ],
    related_issues: [
      {
        description: 'Diabetes 1'
      },
      {
        description: 'Hipertension'
      },
    ]
  },
]

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
  const postdata = {
    title: req.body.title,
    author: req.body.author,
    img: req.body.ingredients[0],
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

const recipeRead = (req, res, next) => {
  res.render('recipe', {
    title: 'Recipes For You',
    recipe: recipes.at(0)
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
    recipe: responseBody
  });
}

const recipeDelete = (req, res, next) => {
  res.render('recipes_delete', {
    title: 'Recipes',
    recipes
  });
}

/*const recipeUpdate = (req, res, next) => {
    res.render('recipes', { 
      title: 'Recipes',
      recipes
    });
  }*/

module.exports = {
  index,
  recipeCreate,
  getRecipe,
  recipeDelete,
  addRecipe
  //recipeUpdate,
};