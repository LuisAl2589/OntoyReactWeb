import { useState, useEffect } from 'react';
function Reloj() {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = time.toLocaleDateString('es-ES', options);
    const formattedTime = time.toLocaleTimeString();
  
    return (
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
        fontSize: '14px',
        textAlign: 'right'
      }}>
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
    );
  }
export default Reloj;