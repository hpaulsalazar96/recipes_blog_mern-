//controllers

const index = (req, res, next) => {
    res.render('login', { 
      title: 'Login',
      message: 'Hi, starting well'
    });
  }

module.exports = {
    index
};