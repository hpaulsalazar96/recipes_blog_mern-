const axios = require('axios')

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
      if (response.status === 200 && response.data) {
        renderIndex(req, res, response.data);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = {
  index
};