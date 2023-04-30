const axios = require('axios')
//const request = require('request');

const apiOptions = {
  server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const renderIndex = (req, res, responseBody) => {
  res.render('index', {
    title: 'Express-On Trending',
    recipesObject: responseBody,
    isLoggedIn: req.session.isLoggedIn
  });
}

// peticion HTTP - GET /api/users
const index = (req, res, next) => {
  const path = '/api/recipes/';

  axios.get(`${apiOptions.server}${path}`)
  .then(response => {
    console.log(response.data);
    if (response.status === 200 && response.data) {
      renderIndex(req, res, response.data);
    }
  })
  .catch(error => {
    console.log(error);
  });
/*
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
    });*/
}

module.exports = {
  index
};