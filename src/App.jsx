import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import ModelViewer from './pages/ModelViewer';  // Importa tu componente de visualización de modelos
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing/>} />
          
          <Route path="/model" element={<ModelViewer />} />  {/* Nueva ruta para el visualizador */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
