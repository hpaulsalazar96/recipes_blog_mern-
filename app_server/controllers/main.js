//controllers

const index = (req, res, next) => {
    res.render('index', { title: 'Mi Page Express' });
  }

module.exports = {
    index
};