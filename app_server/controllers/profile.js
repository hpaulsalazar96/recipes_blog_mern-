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

const index = (req, res, next) => {
  res.render('profile', {
    title: 'Profile',
    message: 'Personal Information',
    username: "1q1q",
    email: "PSV",
    relatedIssues: ['Diabetes 1', 'Hipertension'],
    id: "641d25bd48f447189877dbf9",
    superuser: false
  });
}

const onAction = (req, res, next) => {
  if (req.body.action === 'update') {
    console.log('on update');
    const path = `/api/users/${req.body.id}`; // invoco a la ruta de la API para eliminar por Id;
    console.log(path);
    const postdata = {
      username: req.body.username,
      email: req.body.email,
      relatedIssues: req.body.relatedIssues,
      password: req.body.password,
      superuser: req.body.superuser,
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
          res.render('profile', {
            title: 'Profile',
            message: 'Personal Information',
            username: body.username,
            email: body.email,
            relatedIssues: body.relatedIssues,
            id: body.id,
            superuser: false
          });
        } else {
          console.log('statuscode: ', response.statusCode);
          console.log('error: ', err);
          console.log('req.body: ', req.body);
          console.log('Opciones: ', requestOptions);
          res.render('error', { message: 'Existe un error en la creación de usuarios' });
        }
      });
  } else if (req.body.action === 'delete') {
    console.log('on delete');
    const path = `/api/users/${req.body.id}`; // invoco a la ruta de la API para eliminar por Id;
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
          console.log('Objeto Resultante: ', body);
          return res.redirect('/'); // retorno a la página de inicio
        } else {
          console.log('Status Code: ', response.statusCode);
          res.render('error', {
            mensaje: 'Existe un error en la colección usuarios'
          })
        }
      });
  } else {
    console.log("route not defined");
  }

}

module.exports = {
  index,
  onAction
};