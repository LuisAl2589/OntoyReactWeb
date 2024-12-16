import React, { useState, useEffect } from 'react';
import './css/horario.css';
import AppNavbar from '../components/Navbar'; // Navbar
import Footer from '../components/Footer'; // Footer
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchSchedule, eliminarClaseDelHorario } from '../api/userHorario'; // Funciones API
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]); // Horario completo
  const [classes, setClasses] = useState([]); // Clases registradas
  const [message, setMessage] = useState(''); // Mensaje de éxito/error
  const navigate = useNavigate();

  // Cargar el horario desde el backend
  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetchSchedule(); // Obtenemos el horario del usuario
        setSchedule(response);

        // Filtrar las clases únicas para mostrarlas en la lista de clases
        const uniqueClasses = response.reduce((acc, curr) => {
          if (!acc.some((clase) => clase.id_clase === curr.id_clase)) {
            acc.push({
              id_clase: curr.id_clase,
              nombre_clase: curr.nombre_clase,
              profesor: curr.profesor,
              nombre_nodo: curr.nombre_nodo,
            });
          }
          return acc;
        }, []);
        setClasses(uniqueClasses);
      } catch (error) {
        console.error("Error al cargar el horario", error);
        setMessage("No se pudo cargar el horario.");
      }
    };

    loadSchedule();
  }, []);

  const handleDeleteClass = async (classId) => {
    try {
      const response = await eliminarClaseDelHorario(classId); // Eliminar clase
      setMessage(response.message); // Mensaje de confirmación

      // Actualizar el estado de las clases y el horario
      setClasses(classes.filter(clase => clase.id_clase !== classId));

      // Actualizar el horario para reflejar la clase eliminada
      setSchedule(schedule.filter(entry => entry.id_clase !== classId));
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
      setMessage("No se pudo eliminar la clase.");
    }
  };

  return (
    <div className="w-100 flex-nowrap">
      {/* Navbar */}
      <AppNavbar />

      {/* Contenido principal */}
      <main className="schedule-content">
        <header className="schedule-header text-center">
          <h2>Tu Horario</h2>
        </header>

        {message && <p className="message alert alert-info">{message}</p>}

        {/* Mostrar el horario en tabla */}
        <section className="schedule-section container">
          <table className="schedule-table table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Hora</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              {['07:00:00', '08:30:00', '10:00:00', '10:30:00', '12:00:00', '13:30:00', '15:00:00', '16:30:00', '18:00:00', '18:30:00', '20:00:00', '21:30:00'].map((hora) => (
                <tr key={hora}>
                  <td>{hora.substring(0, 5)}</td>
                  {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map((dia) => {
                    const clase = schedule.find(
                      (entry) => entry.hora_inicio === hora && entry.dia === dia
                    );
                    return (
                      <td key={dia}>
                        {clase ? (
                          <>
                            {clase.nombre_clase} - {clase.profesor} - {clase.nombre_nodo}
                          </>
                        ) : (
                          'Libre'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Materias Registradas */}
        <section className="classes-section container mt-4">
          <h3>Materias Registradas</h3>
          <table className="classes-table table table-striped">
            <thead>
              <tr>
                <th>Nombre de Clase</th>
                <th>Profesor</th>
                <th>Salón</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((clase) => (
                <tr key={clase.id_clase}>
                  <td>
                    <span
                      className="class-name-link"
                      onClick={() => navigate(`/editar-clase/${clase.id_clase}`)}
                    >
                      {clase.nombre_clase}
                    </span>
                  </td>
                  <td>{clase.profesor}</td>
                  <td>{clase.nombre_nodo}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClass(clase.id_clase)}
                    >
                      Eliminar Clase
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Schedule;
