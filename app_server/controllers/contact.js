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
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }
  res.render('contact', {
    title: 'Contacto',
    message: 'Cuentanos',
    description: 'En pocas palabras detalla tus dudas'
  });

}

module.exports = {
  index
};