import './add.css';
import axios from 'axios';

import React, { useState } from 'react';

const AddRecipe = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        issues: [],
        ingredients: [],
    });

    const apiOptions = {
        server: 'http://localhost:3020'
    };
    if (process.env.NODE_ENV === 'production') {
        apiOptions.server = 'https://recipes-blog.herokuapp.com'
    };

    const divStyle = {
        minWidth: '200px',
        minHeight: '650px',
    };

    const handleChange = (e) => {
        const { name, options, multiple } = e.target;
        const selectedValues = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setFormData({ ...formData, [name]: multiple ? selectedValues : e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const path = '/api/recipes/';
        let imageName = formData.ingredients[0]
        if (Array.isArray(req.body.ingredients) && req.body.ingredients.length > 1) {
            imageName = formData.ingredients[0] + ".jpeg"
        } else {
            imageName = formData.ingredients + ".jpeg"
        }
        postdata = ({formData, img: imageName});
        axios
            .post(`${apiOptions.server}${path}`, postdata)
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                setFormData({
                    title: '',
                    author: '',
                    description: '',
                    issues: [],
                    ingredients: [],
                });
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
            });
    };

    return (
        <>
            <div className="d-flex align-items-center vh-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Titulo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="author">Autor:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Descripcion:</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="issues">Problemas Relacionados:</label>
                                    <select
                                        className="form-control"
                                        id="issues"
                                        name="issues"
                                        multiple
                                        value={formData.issues}
                                        onChange={handleChange}
                                    >
                                        <option value="Diabetes">Diabetes</option>
                                        <option value="Anemia">Anemia</option>
                                        <option value="Obesidad">Obesidad</option>
                                        <option value="Posparto">Posparto</option>
                                        <option value="Issue_1">Problema 1</option>
                                        <option value="Issue_1">Problema 1</option>
                                        <option value="Issue_1">Problema 1</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ingredients">Selecciona el ingrediente principal:</label>
                                    <select
                                        className="form-control"
                                        id="ingredients"
                                        name="ingredients"
                                        multiple
                                        value={formData.ingredients}
                                        onChange={handleChange}
                                    >
                                        <option value="proteina_animal">Proteina Animal</option>
                                        <option value="proteina_vegetal">Proteina Vegetal</option>
                                        <option value="carbohidratos">Carbohidratos</option>
                                        <option value="verduras">Verduras</option>
                                        <option value="frutas">Frutas</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Añadir</button>
                            </form>
                        </div>
                        <div className="col-md-4 m-auto ">
                            <div className="p-5 mb-5 h-100 bg-primary text-light d-flex align-items-center" style={divStyle}>
                                <h1>Comida Saludable en Camino</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddRecipe;
