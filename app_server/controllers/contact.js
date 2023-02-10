//controllers

const index = (req, res, next) => {
    res.render('contact', { 
      title: 'Contact',
      message: 'Tell Us',
      description: 'In few words what is the problem'
    });
  }

module.exports = {
    index
};