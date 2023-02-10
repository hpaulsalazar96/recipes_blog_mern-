//controllers

const index = (req, res, next) => {
    res.render('profile', { title: 'Profile' });
  }

module.exports = {
    index
};