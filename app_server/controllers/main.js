//controllers
// controllers de index
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3020' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://hsalazar-dw3.herokuapp.com' // server remoto - produccion
};

const renderIndex = (req, res, responseBody) => {
  res.render('index', {
    title: 'Express-On Trending',
    recipesObject: responseBody
  });
}

// peticion HTTP - GET /api/users
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

/*
let recipes = [
    {
        title: 'Recipe 1',
        author: 'Manuel A',
        img: '1.jpg',
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
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
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
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
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
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
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
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
    {
      title: 'Recipe 5',
      author: 'Manuel A',
      img: '5.jpg',
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
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
]*/

module.exports = {
  index
};