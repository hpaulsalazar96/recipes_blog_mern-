//controllers

const index = (req, res, next) => {
    res.render('signup', { title: 'Signup' });
  }

module.exports = {
    index
};