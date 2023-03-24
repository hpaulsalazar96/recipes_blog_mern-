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

module.exports = {
  index
};