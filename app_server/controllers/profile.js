//controllers

let information = 
  {
      username: "hsalazar",
      email: "hsalazar@mail.ru",
      issues: [
        {
          description: 'Diabetes 1'
        },
        {
          description: 'Hipertension'
        },
      ]
  }

const index = (req, res, next) => {
    res.render('profile', { 
      title: 'Profile',
      message: 'Personal Information',
      information
    });
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