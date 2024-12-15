import { useState, useEffect } from 'react';
import './css/horario.css';
import { fetchClassesComplet } from '../api/schedule'; 
import {  agregarClaseAlHorario } from '../api/userHorario';

const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [message, setMessage] = useState('');

  // Cargar clases disponibles desde el backend
  useEffect(() => {
    const loadClasses = async () => {
      try {
        console.log("Fetching classes from backend...");
        const response = await fetchClassesComplet(); // Obtenemos las clases desde el backend
        console.log("Classes fetched successfully:", response);
        setClasses(response);
      } catch (error) {
        console.error("Error al cargar las clases", error);
        setMessage("No se pudieron cargar las clases");
      }
    };

    loadClasses();
  }, []);

  // Manejar la selección y agregar la clase al horario
  const handleAddClass = async () => {
    if (!selectedClass) {
      setMessage('Selecciona una clase primero.');
      return;
    }

    try {
      console.log("Adding class to user schedule...");
      const response = await agregarClaseAlHorario(selectedClass); // Llamada al backend para agregar la clase
      console.log("Class added successfully:", response);
      setMessage('¡Clase agregada a tu horario!');
    } catch (error) {
      console.error("Error al agregar la clase:", error);
      setMessage(`Hubo un error al agregar la clase: ${error.message}`);
    }
  };

  return (
    <div className="schedule-container">
      <h2>Selecciona una clase para agregar a tu horario</h2>

      {message && <p className="message">{message}</p>}

      <div>
        <select
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="class-select"
        >
          <option value="">Selecciona una clase</option>
          {classes.map((clase) => (
            <option key={clase.id_clase} value={clase.id_clase}>
              {clase.nombre_clase} - {clase.profesor} - {clase.nombre_nodo}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAddClass} className="add-class-button">
        Agregar clase
      </button>
    </div>
  );
};

export default Schedule;