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
  console.log(path);
  const postdata = {
    author: req.body.author,
    content: req.body.content,
    score: req.body.score,
  };
  axios
    .post(`${apiOptions.server}${path}`, postdata)
    .then((response) => {
      console.log(response.data);
      if (response.status === 201) {
        return res.redirect(`/recipes/read/${req.params.recipeId}`);
      }
    })
    .catch((error) => {
      console.log(error);
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
  console.log(req.params.commentId);
  console.log(path);

  axios
    .delete(`${apiOptions.server}${path}`)
    .then((response) => {
      console.log(response.data);
      if (response.status === 204) {
        return res.redirect(`/recipes`);
      }
    })
    .catch((error) => {
      console.log(error);
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
    console.log("Se ejecuta metodo PUT");
    for (const comment of comments) {
      if (comment.includes(`"author":"${req.body.author}"`)) {
        const items = comment.split(",");
        for (const item of items) {
          if (item.includes("recipeReference")) {
            console.log(item);
            const commid = item.split(":")[1];
            const commidi = commid.split('"')[1];
            console.log(commidi);
            recipeId = commidi;
          }
          if (item.includes("_id")) {
            console.log(item);
            const commid = item.split(":")[1];
            const commidi = commid.split('"')[1];
            console.log(commidi);
            commentId = commidi;
          }
        }
      }
      const path = `/api/comments/${recipeId}/${commentId}`; // invoco a la ruta de la API para eliminar por Id;
      console.log(path);
      const postdata = {
        author: req.body.author,
        content: req.body.content,
        score: req.body.score,
      };
      axios
        .put(`${apiOptions.server}${path}`, postdata)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            return res.redirect(`/recipes/read/${req.params.recipeId}`);
          }
        })
        .catch((error) => {
          console.log(error);
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
    console.log("New Post");
    const path = `/api/recipes/${req.params.recipeId}`;
    console.log(path);
    const postdata = {
      author: req.body.author,
      content: req.body.content,
      score: req.body.score,
    };
    axios
      .post(`${apiOptions.server}${path}`, postdata)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          return res.redirect(`/recipes/read/${req.params.recipeId}`);
        }
      })
      .catch((error) => {
        console.log(error);
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
