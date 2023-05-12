import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import AddRecipe from './components/recipes/AddRecipe'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;