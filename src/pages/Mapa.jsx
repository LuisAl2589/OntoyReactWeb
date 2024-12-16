import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, Grid } from '@react-three/drei';
import { Modelo } from '../components/mapa/Modelo';
import React, { useState, useEffect, useCallback } from 'react';
import { Vector3 } from 'three';
import { obtenerNodos} from '../api/nodos';
import { obtenerAristas} from '../api/aristas';
import { obtenerRuta } from '../api/rutas';
import { buscarHorarioClaseSalon } from '../api/busqueda';

import Reloj from '../components/mapa/Reloj';
import Marcador from '../components/mapa/Marcador';
import Buscador from '../components/Buscador';

import RutaArista from '../components/mapa/RutaArista';
import { Modal, Button, Table } from 'react-bootstrap';
import './css/mapa.css';

const nodoOrigen = 64;
const nodoDestino = 204;

const Aristas = React.memo(({ nodoOrigen, nodoDestino }) => {
  const points = [
    new Vector3(nodoOrigen.coordenadaX, nodoOrigen.coordenadaY, nodoOrigen.coordenadaZ),
    new Vector3(nodoDestino.coordenadaX, nodoDestino.coordenadaY, nodoDestino.coordenadaZ),
  ];
  return <Line points={points} color="white" lineWidth={5} dashed />;
});

const NodoBuscado = React.memo(({ coordenadaX, coordenadaY, coordenadaZ }) => {
  return <Modelo archivo={'logo.glb'} posicion={[coordenadaX, coordenadaY, coordenadaZ]} animar />;
});

const Mapa = () => {
  const [nodos, setNodos] = useState([]);
  const [aristas, setAristas] = useState([]);
  const [ruta, setRuta] = useState([]);
  const [salonBuscado, setSalonBuscado] = useState(null);
  const [salonBuscado2, setSalonBuscado2] = useState(null);
  


  const [selectedNode, setSelectedNode] = useState(null);
  const [horarioSelectNode, setHorarioSelectNode] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [nodosData, aristasData, rutaData] = await Promise.all([
        obtenerNodos(),
        obtenerAristas(),
        //obtenerRuta(salonBuscado.id, salonBuscado2.id),
      ]);
      console.log(nodosData);
      
      setNodos(nodosData);
      setAristas(aristasData);
      //setRuta(rutaData.ruta);
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSalonBuscado = (salon) => setSalonBuscado(salon);
  const handleSalonBuscado2 = (salon2) => setSalonBuscado2(salon2);

  const handleRuta = async () => {
    try {
      const response = await obtenerRuta(salonBuscado.id, salonBuscado2.id);
      console.log(response.ruta);
      setRuta(response.ruta);
    } catch (error) {
      console.error('Error al obtener la ruta', error);
    }
  };

  






  const handleClick = (nodo) => {
    handleHorarioSelectNode(nodo.id);
    setSelectedNode(nodo)
  };

  const handleHorarioSelectNode = async (idNodo) => {
    try {
      const response = await buscarHorarioClaseSalon(idNodo);
      setHorarioSelectNode(response.data);
    } catch (error) {
      console.error('Error al obtener el horario del nodo', error);
    }
  };

  return (
    <div className="mapa">
    
        <Buscador handleFunction={handleSalonBuscado} handleFunction2={handleSalonBuscado2} handleGenerar={handleRuta} />
        



      <Canvas
        style={{ height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0)' }}
        camera={{ position: [-10, 150, 0], fov: 50 }}
      >
        {nodos.map((nodo, index) => (
          <Marcador
            key={index}
            position={[nodo.coordenadaX, nodo.coordenadaY, nodo.coordenadaZ]}
            color="red"
            radius={1}
            thickness={0.1}
            onClick={() => handleClick(nodo)}
          />
        ))}
        

        {/* Luces para iluminar la escena */}
        <ambientLight intensity={1.5} />
        <ambientLight color={"white"} intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <directionalLight position={[-5, -5, -5]} />
        

        {/* Controles de la cámara */}
        <OrbitControls
          minDistance={0}
          maxDistance={Infinity}
          enableZoom
          enablePan
          enableRotate
          zoomSpeed={1}
        />
        
        {/* Modelo */}
        <Modelo archivo={'ESCUELA.glb'} posicion={[0, 0, 0]} />
        {salonBuscado && (
          <NodoBuscado
            coordenadaX={salonBuscado.coordenadaX}
            coordenadaY={salonBuscado.coordenadaY + 2.5}
            coordenadaZ={salonBuscado.coordenadaZ}
          />
        )}

        {salonBuscado2 && (
          <NodoBuscado
            coordenadaX={salonBuscado2.coordenadaX}
            coordenadaY={salonBuscado2.coordenadaY + 2.5}
            coordenadaZ={salonBuscado2.coordenadaZ}
          />
        )}

        {/* Ruta */}
        {ruta.map((arista, index) => (
          <RutaArista key={index} nodoOrigen={arista.origen} nodoDestino={arista.destino} />
        ))}
      </Canvas>

      <Reloj className="reloj" />

      {selectedNode && (
        <Modal size="lg" show={true} onHide={() => setSelectedNode(null)}
          
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title>Horario del salón {selectedNode.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped hover responsive >
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Profesor</th>
                  <th>Día</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                </tr>
              </thead>
              <tbody>
                {horarioSelectNode &&
                  horarioSelectNode.map((horario, index) => (
                    <tr key={index}>
                      <td>{horario.clase}</td>
                      <td>{horario.profesor}</td>
                      <td>{horario.dia}</td>
                      <td>{horario.hora_inicio}</td>
                      <td>{horario.hora_fin}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setSelectedNode(null)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Mapa;
