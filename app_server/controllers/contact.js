//controllers

const index = (req, res, next) => {
    res.render('contact', { title: 'Contact' });
  }

module.exports = {
    index
};