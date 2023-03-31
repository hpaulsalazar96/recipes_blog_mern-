const axios = require('axios')
//const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3020' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com' // server remoto - produccion
};

const index = (req, res, next) => {
  res.render('contact', {
    title: 'Contact',
    message: 'Tell Us',
    description: 'In few words what is the problem'
  });
}

module.exports = {
  index
};