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
  res.render('recipes', {
    title: 'Recipes',
    recipes
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
    img: req.body.img,
    relatedIssues: req.body.relatedIssues,
    password: req.body.password,
    superuser: req.body.superuser,
  }

  const requestOptions = { // objeto cargado con las opciones para request
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  if (req.body.password === req.body.cpassword) {
    request(requestOptions,
      (err, response, body) => {
        console.log('Opciones: ', requestOptions);
        if (response.statusCode === 201) { // creación exitosa
          console.log('Body: ', body);
          // volver a mostrar la vista users_add para el ingreso de más documentos
          return res.redirect('/login');
        } else {
          console.log('statuscode: ', response.statusCode);
          console.log('error: ', err);
          console.log('req.body: ', req.body);
          console.log('Opciones: ', requestOptions);
          res.render('error', { message: 'Existe un error en la creación de usuarios' });
        }
      });
  } else {
    console.log("no coincide la contraseña");
  }
}

const recipeRead = (req, res, next) => {
  res.render('recipe', {
    title: 'Recipes For You',
    recipe: recipes.at(0)
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
  recipeRead,
  recipeDelete,
  addRecipe
  //recipeUpdate,
};