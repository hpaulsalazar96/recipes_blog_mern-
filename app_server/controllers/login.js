const axios = require('axios')

const apiOptions = {
  server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const index = (req, res, next) => {
  res.render('login', {
    title: 'Login',
    message: 'Welcome Back!!!'
  });
}

const getUser = (req, res, next) => {
  const path = `/api/search/${req.body.username}`;
  console.log(req.body.username);

  axios.get(`${apiOptions.server}${path}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        if (response.data[0].password === req.body.password) {
          req.session._id = response.data[0]._id;
          req.session.data = response.data[0];
          req.session.isLoggedIn = true
          req.session.save();
          return res.redirect('/');
        } else {
          console.log('Contraseña incorrecta');
          return res.redirect('/login');

        }
      }
    })
    .catch(error => {
      console.log(error);
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
  getUser,
  renderMain
};