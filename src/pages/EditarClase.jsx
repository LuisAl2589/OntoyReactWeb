import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar'; // Importar Navbar
import Footer from '../components/Footer'; // Importar Footer
import { fetchClassesComplet } from '../api/schedule'; // Para obtener las clases disponibles
import { editarClaseEnHorario } from '../api/userHorario'; // Para actualizar la clase del usuario

const EditarClaseUsuario = () => {
  const { id_clase } = useParams();  // Obtener el id_clase desde la URL
  const navigate = useNavigate();

  const [clases, setClases] = useState([]);  // Para almacenar las clases disponibles
  const [selectedClass, setSelectedClass] = useState('');  // Clase seleccionada por el usuario
  const [error, setError] = useState('');  // Para manejar errores
  const [message, setMessage] = useState('');  // Para mostrar mensajes de éxito
  const [classDetails, setClassDetails] = useState(null);  // Detalles de la clase seleccionada

  // Cargar las clases disponibles
  useEffect(() => {
    document.body.style.backgroundColor = '#35ace4';
    const loadClasses = async () => {
      try {
        const response = await fetchClassesComplet();  // Obtiene todas las clases disponibles
        setClases(response);

        // Buscar la clase por id_clase para mostrar los detalles
        const currentClass = response.find((clase) => clase.id_clase === parseInt(id_clase));
        if (currentClass) {
          setClassDetails(currentClass);
          setSelectedClass(currentClass.id_clase);  // Establecer la clase seleccionada
        }
      } catch (err) {
        console.error("Error al cargar las clases:", err);
        setError("No se pudieron cargar las clases.");
      }
    };

    loadClasses();
  }, [id_clase]);  // Re-cargar si el id_clase cambia

  // Manejo de cambio de clase seleccionada
  const handleChangeClass = (e) => {
    setSelectedClass(e.target.value);  // Asegurarse de que se guarde solo el ID
  };

  // Manejo del formulario de actualización
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass) {
      setError('Por favor, selecciona una nueva clase.');
      return;
    }

    try {
      // Llamar a la función para actualizar la clase en el horario del usuario
      const result = await editarClaseEnHorario(id_clase, selectedClass);  // Mandar solo el id_clase seleccionado
      if (result) {
        setMessage('Clase actualizada con éxito.');
        setError('');
        setTimeout(() => navigate('/horario'), 2000);  // Redirigir al horario después de un tiempo
      } else {
        setError('No se pudo actualizar la clase.');
      }
    } catch (err) {
      setError('Hubo un error al actualizar la clase.');
      console.error(err);
    }
  };

  return (
    <div className='w-100 vh-100'>
        <AppNavbar />
        <div className='vh-100 d-flex align-content-center flex-nowrap'>
    <div className="register-container vh-75 ">

      <h2>Editar Clase: {classDetails ? classDetails.nombre_clase : 'Cargando...'}</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="class-select">Selecciona la nueva clase:</label>
          <select
            id="class-select"
            value={selectedClass || ''}  // Asegurarse de que el valor sea una cadena vacía si no está seleccionado
            onChange={handleChangeClass}
          >
            <option value="">Seleccione una clase</option>
            {clases.map((clase) => (
              <option key={clase.id_clase} value={clase.id_clase}>
                {clase.nombre_clase} - {clase.profesor} - {clase.nombre_nodo}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Actualizar Clase</button>
      </form>

      {/* Footer */}
      </div>
      </div>
    <Footer />
    </div>
  );
};

export default EditarClaseUsuario;
