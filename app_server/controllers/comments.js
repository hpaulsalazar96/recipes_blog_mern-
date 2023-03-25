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


const deleteComment = (req, res) => {
    const path = `/api/comments/delete/${req.params.commentId}`; // invoco a la ruta de la API para eliminar por Id;
    console.log(req.params.commentId);
    console.log(path);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',
        json: {}
    }
    console.log('Ruta: ', path);
    request(
        requestOptions, // Opciones
        (err, response, body) => { // callback con sus 3 partes
            console.log('Documento: ', body);
            console.log('Status Code: ', response.statusCode);
            if (err) {
                console.log('Request encontró el error: ', err);
            } else if (response.statusCode === 204) { // delete status code
                console.log('Objeto Resultante: ', body);
                return res.redirect(`/recipes/read/${req.params.recipeId}`); // retorno a la página de inicio
            } else {
                console.log('Status Code: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección usuarios'
                })
            }
        });

}

const onAction = (req, res) => {
    const comments = req.body.comments.split('}')
    let commentId = ""
    let recipeId = ""

    if (req.body.comments.includes(`"author":"${req.body.author}"`)) {
        console.log("Se ejecuta metodo PUT");
        for (const comment of comments) {
            if (comment.includes(`"author":"${req.body.author}"`)) {
                const items = comment.split(',')
                for (const item of items) {
                    if (item.includes("recipeReference")) {
                        console.log(item);
                        const commid = (item.split(':'))[1]
                        const commidi = (commid.split('"'))[1]
                        console.log(commidi);
                        recipeId = commidi;
                    }
                    if (item.includes("_id")) {
                        console.log(item);
                        const commid = (item.split(':'))[1]
                        const commidi = (commid.split('"'))[1]
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
            }
            const requestOptions = {
                url: `${apiOptions.server}${path}`, 
                method: 'PUT',
                json: postdata
            } 
            console.log('Ruta: ', path);
            request(requestOptions,
                (err, response, body) => {
                    console.log('Opciones: ', requestOptions);
                    if (response.statusCode === 200) { // creación exitosa
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




    } else {
        console.log("New Post");
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
}

module.exports = {
    addComment,
    deleteComment,
    onAction
};