//controllers
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3020' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://recipes-blog.herokuapp.com' // server remoto - produccion
};

const addComment = (req, res) => {
    const path = `/api/recipes/${req.params.recipeId}`;
    console.log(path);
    const postdata = {
      author: req.body.author,
      content: req.body.content,
      score: req.body.score,
    }
  
    const requestOptions = { // objeto cargado con las opciones para request
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postdata
    };
    request(requestOptions,
      (err, response, body) => {
        console.log('Opciones: ', requestOptions);
        if (response.statusCode === 201) { // creación exitosa
          console.log('Body: ', body);
          // volver a mostrar la vista users_add para el ingreso de más documentos
          return res.redirect(`/recipes/read/${req.params.recipeId}`);
        } else {
          console.log('statuscode: ', response.statusCode);
          console.log('error: ', err);
          console.log('req.body: ', req.body);
          console.log('Opciones: ', requestOptions);
          res.render('error', { message: 'Existe un error en la creación de usuarios' });
        }
      });
  }

  module.exports = {
    addComment,
  };