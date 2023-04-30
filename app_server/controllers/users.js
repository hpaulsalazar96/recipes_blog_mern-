const axios = require('axios')

const apiOptions = {
  server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const renderUsers = (req, res, responseBody) => {
  res.render('users',
    {
      title: 'Página de Usuarios',
      usersObject: responseBody
    });
}

const users = (req, res, next) => {
  const path = '/api/users/';
  axios.get(`${apiOptions.server}${path}`)
  .then(response => {
    console.log(response.data);
    if (response.status === 200 && response.data) {
      renderUsers(req, res, body);
    }
  })
  .catch(error => {
    console.log(error);
    res.render('error', {
      message: 'Existe un error en la colección usuarios'
    });
  });
}

const addUsers = (req, res) => {
  res.render('users_add', {
    titulo: 'Creación de Usuarios',
    mensaje: 'Bienvenido a Creación de Usuarios'
  });
}

const doAddUsers = (req, res) => {
  const path = '/api/users/';
  const postdata = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    identificacion: req.body.identificacion,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    edad: req.body.edad,
    tipo: req.body.tipo,
    nombres: req.body.nombres,
    carrera: req.body.carrera,
    fecha: req.body.fecha
  }
  axios.post(`${apiOptions.server}${path}`)
  .then(response => {
    console.log(response.data);
    if (response.status === 200 && response.data) {
      renderIndex(req, res, response.data);
    }
  })
  .catch(error => {
    console.log(error);
    res.render('error', {
      message: 'Existe un error en la colección comentarios'
    });
  });
}

module.exports = {
  users,
  addUsers,
  doAddUsers,
}