


const recipeCreate = (req, res) => {
    res
        .status(200)
        .json({
            "status": "created successfully"
        });
}

const recipeList = (req, res) => {
    res
        .status(200)
        .json({
            "status": "listed successfully"
        });
}

const recipeRead = (req, res) => {
    res
        .status(200)
        .json({
            "status": "read action successfully"
        });
}

const recipeUpdate = (req, res) => {
    res
        .status(200)
        .json({
            "status": "Update action successfully"
        });
}

const recipeDelete = (req, res) => {
    res
        .status(200)
        .json({
            "status": "Delete action successfully"
        });
}

module.exports = {
    recipeCreate, 
    recipeList,
    recipeRead,
    recipeUpdate,
    recipeDelete
}