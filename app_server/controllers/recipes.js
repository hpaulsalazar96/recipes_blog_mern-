//controllers

let recipes = [
    {
        title: 'Recipe 1',
        author: 'Manuel A',
        img: '1.jpg',
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
        items: [
          {
            name: 'sal 1 Cucharada'
          },
          {
            name: 'pechuga de pollo 500mg'
          },
        ],
        related_issues: [
          {
            description: 'Diabetes 1'
          },
          {
            description: 'Hipertension'
          },
        ]
    },
    {
        title: 'Recipe 2',
        author: 'Manuel A',
        img: '2.jpg',
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
        items: [
          {
            name: 'sal'
          },
          {
            name: 'pechuga de pollo'
          },
        ],
        related_issues: [
          {
            description: 'Diabetes 2'
          },
        ]
    },
    {
        title: 'Recipe 3',
        author: 'Manuel A',
        img: '3.jpg',
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
        items: [
          {
            name: 'sal'
          },
          {
            name: 'pechuga de pollo'
          },
        ],
        related_issues: [
          {
            description: 'Hipertension'
          },
        ]
    },
    {
        title: 'Recipe 4',
        author: 'Manuel A',
        img: '4.jpg',
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio laoreet diam commodo porttitor. Donec non enim commodo, gravida ipsum in, accumsan est. Vestibulum pharetra sed dolor quis bibendum. Etiam ipsum orci, aliquam sit amet vulputate non, fermentum viverra felis. Nullam eget semper sem, eu feugiat magna. Sed fringilla bibendum felis et ultricies. Ut imperdiet bibendum tellus, at convallis arcu facilisis sit amet. Cras pellentesque vehicula ligula, vitae ullamcorper purus aliquet a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eget tortor felis. Morbi id vehicula metus. Morbi sed pharetra purus. Nam blandit dapibus nisl vel aliquet. Fusce iaculis justo massa, ac convallis lorem rutrum in. Pellentesque pharetra ullamcorper nisi eu tristique. Sed faucibus, dolor et vestibulum feugiat, nunc dolor tempus massa, vel facilisis enim metus eget dolor. ",
        items: [
          {
            name: 'sal'
          },
          {
            name: 'pechuga de pollo'
          },
        ],
        related_issues: [
          {
            description: 'Diabetes 1'
          },
          {
            description: 'Hipertension'
          },
        ]
    },
]

const index = (req, res, next) => {
    res.render('recipes', { 
      title: 'Recipes',
      recipes 
    });
  }

const recipeCreate = (req, res, next) => {
    res.render('recipes_create_form', { 
      title: 'Recipes',
      message: 'Healthy Meal On Comming!!!'
    });
  }

const recipeRead = (req, res, next) => {
    res.render('recipe', { 
      title: 'Recipes For You',
      recipe: recipes.at(0)
    });
  }

const recipeDelete = (req, res, next) => {
    res.render('recipes_delete', { 
      title: 'Recipes',
      recipes
    });
  }

/*const recipeUpdate = (req, res, next) => {
    res.render('recipes', { 
      title: 'Recipes',
      recipes
    });
  }*/

module.exports = {
    index,
    recipeCreate,
    recipeRead,
    recipeDelete,
    //recipeUpdate,
};