const axios = require('axios')
//const request = require('request');

const apiOptions = {
  server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const index = (req, res, next) => {
  res.render('signup', {
    title: 'SignUp',
    message: 'Hi, starting well'
  });
}

const addUser = (req, res) => {
  const path = '/api/users/';
  const postdata = {
    username: req.body.username,
    email: req.body.email,
    identificacion: req.body.identificacion,
    relatedIssues: req.body.relatedIssues,
    password: req.body.password,
    superuser: req.body.superuser,
  }
  if (req.body.password === req.body.cpassword) {
    axios.post(`${apiOptions.server}${path}`, postdata)
      .then(response => {
        if (response.status === 201) {
          // console.log('Body: ', response.data);
          return res.redirect('/login');
        }

      })
      .catch(error => {
        console.log(error);
        console.log('statuscode: ', response.statusCode);
        console.log('error: ', error);
        console.log('req.body: ', response.body);
        console.log('Opciones: ', requestOptions);
        res.render('error', { message: 'Existe un error en la creación de usuarios' });
      });
  }
  /*
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
  }*/
}

module.exports = {
  index,
  addUser
};