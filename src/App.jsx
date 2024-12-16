import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';
import RegisterClass from './pages/RegisterClass';  
import RegisterSchedule from './pages/RegisterSchedule';
import Mapa from './pages/Mapa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/AuthRoute';
import MapESCOM from './pages/MapESCOM';
import AdminPanel from './pages/panelAdmin';
import ListaUsuarios from './pages/ListaUsuarios';
import EditarUsuario from './pages/EditarUsuario';
import SobreNosotros from './pages/SobreNosotros';
import Contactos from './pages/Contactos';
import LoadPage from './components/LoadPage';

function App() {
  const [showLoader, setShowLoader] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<AuthRoute type="public" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas protegidas */}
          <Route element={<AuthRoute type="protected" />}>
            {/* Ruta para Mapa con pantalla de carga */}
            <Route
              path="/mapa"
              element={showLoader ? <LoadPage /> : <Mapa />}
            />
            <Route path="/register-class" element={<RegisterClass />} />
            <Route path="/register-schedule" element={<RegisterSchedule />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/listaUsuarios" element={<ListaUsuarios />} />
            <Route path="/admin/editarUsuario/:boleta" element={<EditarUsuario />} />
          </Route>

          {/* Otras rutas */}
          <Route path="/" element={<Landing />} />
          <Route path="/mapas" element={<MapESCOM />} />
          <Route path="/sobre" element={<SobreNosotros />} />
          <Route path="/contactos" element={<Contactos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
