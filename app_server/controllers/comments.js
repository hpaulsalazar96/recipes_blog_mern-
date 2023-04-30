const axios = require("axios");

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: "http://localhost:3020", // server local
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://recipes-blog.herokuapp.com"; // server remoto - produccion
}

const addComment = (req, res) => {
  const path = `/api/recipes/${req.params.recipeId}`;
  const postdata = {
    author: req.body.author,
    content: req.body.content,
    score: req.body.score,
  };
  axios
    .post(`${apiOptions.server}${path}`, postdata)
    .then((response) => {
      if (response.status === 201) {
        return res.redirect(`/recipes/read/${req.params.recipeId}`);
      }
    })
    .catch((error) => {
      console.log("statuscode: ", response.statusCode);
      console.log("error: ", error);
      console.log("req.body: ", response.body);
      console.log("Opciones: ", requestOptions);
      res.render("error", {
        message: "Existe un error en la creación de comentarios",
      });
    });
};

const deleteComment = (req, res) => {
  const path = `/api/comments/delete/${req.params.commentId}`;

  axios
    .delete(`${apiOptions.server}${path}`)
    .then((response) => {
      if (response.status === 204) {
        return res.redirect(`/recipes`);
      }
    })
    .catch((error) => {
      res.render("error", {
        message: "Existe un error en la colección comentarios",
      });
    });
};

const onAction = (req, res) => {
  const comments = req.body.comments.split("}");
  let commentId = "";
  let recipeId = "";

  if (req.body.comments.includes(`"author":"${req.body.author}"`)) {
    for (const comment of comments) {
      if (comment.includes(`"author":"${req.body.author}"`)) {
        const items = comment.split(",");
        for (const item of items) {
          if (item.includes("recipeReference")) {
            const commid = item.split(":")[1];
            const commidi = commid.split('"')[1];
            recipeId = commidi;
          }
          if (item.includes("_id")) {
            const commid = item.split(":")[1];
            const commidi = commid.split('"')[1];
            commentId = commidi;
          }
        }
      }
      const path = `/api/comments/${recipeId}/${commentId}`; // invoco a la ruta de la API para eliminar por Id;
      const postdata = {
        author: req.body.author,
        content: req.body.content,
        score: req.body.score,
      };
      axios
        .put(`${apiOptions.server}${path}`, postdata)
        .then((response) => {
          if (response.status === 200) {
            return res.redirect(`/recipes/read/${req.params.recipeId}`);
          }
        })
        .catch((error) => {
          console.log("statuscode: ", response.statusCode);
          console.log("error: ", error);
          console.log("req.body: ", response.body);
          console.log("Opciones: ", requestOptions);
          res.render("error", {
            message: "Existe un error en la creación de comentarios",
          });
        });
    }
  } else {
    const path = `/api/recipes/${req.params.recipeId}`;
    const postdata = {
      author: req.session.data.username,
      content: req.body.content,
      score: req.body.score,
    };
    axios
      .post(`${apiOptions.server}${path}`, postdata)
      .then((response) => {
        if (response.status === 201) {
          return res.redirect(`/recipes/read/${req.params.recipeId}`);
        }
      })
      .catch((error) => {
        res.render("error", {
          message: "Existe un error en la colección comentarios",
        });
      });
  }
};

module.exports = {
  addComment,
  deleteComment,
  onAction,
};
