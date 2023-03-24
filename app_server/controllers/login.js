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
  res.render('login', {
    title: 'Login',
    message: 'Welcome Back!!!'
  });
}

const getUser = (req, res, next) => {
  const path = `/api/search/${req.body.username}`; // invoco a la ruta de la API para buscar por Id;
  console.log(req.body.username);
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
        if (body[0].password === req.body.password) {
          //console.log('Objeto Resultante: ', body.shift());
          return res.redirect('/'); // retorno a la página de inicio
          renderMain(req, res, body[0]); // llamar a la función que hace render de la vista users_delete
        } else {
          console.log('Contraseña incorrecta');
        }
      } else {
        console.log('Status Code: ', response.statusCode);
        res.render('error', {
          mensaje: 'Existe un error en la colección usuarios'
        })
      }
    });

}

const renderMain = (req, res, responseBody) => {
  console.log(`response`, responseBody);
  res.render('profile', {
    title: 'Profile',
    message: 'Personal Information',
    username: responseBody.username,
    email: responseBody.email,
    relatedIssues: responseBody.relatedIssues,
    superuser: responseBody.superuser,
    id: responseBody._id
  });
}

module.exports = {
  index,
  getUser
};