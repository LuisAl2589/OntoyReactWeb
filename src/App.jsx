import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import RegisterClass from './pages/RegisterClass';  
import RegisterSchedule from './pages/RegisterSchedule';
import Mapa from './pages/Mapa';  // Importa tu componente de visualización de modelos
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/AuthRoute';


function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route element={<AuthRoute type="public" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Route>
          <Route element={<AuthRoute type="protected" />}>
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/register-class" element={<RegisterClass />} /> 
            <Route path="/register-schedule" element={<RegisterSchedule />} /> 
          </Route>
          <Route path="/" element={<Landing/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
