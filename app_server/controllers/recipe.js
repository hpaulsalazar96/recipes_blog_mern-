//controllers

const index = (req, res, next) => {
    res.render('recipe', { title: 'Recipe' });
  }

module.exports = {
    index
};