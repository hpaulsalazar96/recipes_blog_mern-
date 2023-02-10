//controllers

const index = (req, res, next) => {
    res.render('signup', { 
      title: 'SignUp',
      message: 'Welcome Back!!!'
    });
  }

module.exports = {
    index
};