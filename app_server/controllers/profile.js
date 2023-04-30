const axios = require('axios')

const apiOptions = {
  server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const index = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
  }
  res.render('profile', {
    title: 'Profile',
    message: 'Personal Information',
    username: req.session.data.username,
    email: req.session.data.email,
    relatedIssues: req.session.data.relatedIssues,
    id: req.session.data._id,
    superuser: req.session.data.superuser
  });
}

const onAction = (req, res, next) => {
  if (req.body.action === 'update') {
    console.log('on update');
    const path = `/api/users/${req.body.id}`;
    console.log(path);
    const postdata = {
      username: req.body.username,
      email: req.body.email,
      relatedIssues: req.body.relatedIssues,
      password: req.body.password,
      superuser: req.body.superuser,
    }
    axios.put(`${apiOptions.server}${path}`, postdata)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          console.log('Body: ', response.data);
          res.render('profile', {
            title: 'Profile',
            message: 'Personal Information',
            username: response.data.username,
            email: response.data.email,
            relatedIssues: response.data.relatedIssues,
            id: response.data.id,
            superuser: response.data.superuser
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  if (req.body.action === 'delete') {
    const path = `/api/users/${req.body.id}`;
    axios.delete(`${apiOptions.server}${path}`)
      .then(response => {
        console.log(response.data);
        if (response.status === 204) {
          console.log('Objeto Resultante: ', response.data);
          return res.redirect('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  if (req.body.action === 'signout') {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/login');
      }
    });
  }

}

module.exports = {
  index,
  onAction
};