//controllers

const index = (req, res, next) => {
    res.render('profile', { title: 'Profile' });
  }

const profileDelete = (req, res, next) => {
    res.render('profile', { title: 'profile' });
  }

const profileUpdate = (req, res, next) => {
    res.render('profile', { title: 'profile' });
  }

module.exports = {
    index,
    profileDelete,
    profileUpdate,
};