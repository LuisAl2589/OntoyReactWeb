import React from 'react';
import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing/>} />
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
