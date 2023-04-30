const axios = require('axios')

const apiOptions = {
    server: 'http://localhost:3020'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://recipes-blog.herokuapp.com'
};

const index = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/');
        }
    });
}

module.exports = {
    index,
};