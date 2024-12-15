import { useState, useEffect } from 'react'; 
import './css/horario.css';
import { fetchSchedule, eliminarClaseDelHorario } from '../api/userHorario'; // Función para eliminar la clase
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Cargar el horario desde el backend
  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetchSchedule(); // Obtenemos el horario del usuario
        setSchedule(response);
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
      const response = await eliminarClaseDelHorario(classId);
      setMessage(response.message); // Mensaje de confirmación
      // Recargar el horario actualizado
      setClasses(classes.filter(clase => clase.id_clase !== classId));
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
      setMessage("No se pudo eliminar la clase.");
    }
  };

  return (
    <div className="schedule-container">
      <h2>Tu Horario</h2>
      {message && <p className="message">{message}</p>}

      {/* Mostrar el horario en tabla */}
      <table className="schedule-table">
        <thead>
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
                    {clase ? `${clase.nombre_clase} - ${clase.profesor} - ${clase.nombre_nodo}` : 'Libre'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Materias Registradas</h3>
      <table className="classes-table">
        <thead>
          <tr>
            <th>Nombre de Clase</th>
            <th>Profesor</th>
            <th>Nodo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((clase) => (
            <tr key={clase.id_clase}>
              <td>{clase.nombre_clase}</td>
              <td>{clase.profesor}</td>
              <td>{clase.nombre_nodo}</td>
              <td>
                <button onClick={() => handleDeleteClass(clase.id_clase)}>Eliminar Clase</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
