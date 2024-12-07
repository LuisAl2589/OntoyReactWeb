import { Canvas} from '@react-three/fiber';
import { Line, FirstPersonControls, Grid, OrbitControls } from '@react-three/drei';
import { Modelo } from '../components/mapa/Modelo'
import React, { useState, useEffect } from 'react';
import { Vector3 } from 'three';
import { obtenerNodos } from '../api/nodos';
import { obtenerAristas } from '../api/aristas';
import Reloj from '../components/mapa/Reloj';
import Marcador from '../components/mapa/Marcador';
import Buscador from '../components/Buscador';
import { Modal, Button } from 'react-bootstrap';
import './css/mapa.css';

const scale = 2;
function RouteLine({ nodoOrigen, nodoDestino }) {
  const points = [
    new Vector3(nodoOrigen.coordenadaX, nodoOrigen.coordenadaY, nodoOrigen.coordenadaZ),
    new Vector3(nodoDestino.coordenadaX, nodoDestino.coordenadaY, nodoDestino.coordenadaZ),
  ];
  return (
    <Line
      points={points}
      color="blue"
      lineWidth={3}
      dashed={true}
    />
  );
}

function NodoBuscado({coordenadaX, coordenadaY, coordenadaZ}) {
  return (
    <Modelo archivo={'logo.glb'} posicion={[coordenadaX,coordenadaY,coordenadaZ]} animar={true}/>
  );

}


function Mapa() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodos, setNodos] = useState([]);
  const [salonBuscado, setSalonBuscado] = useState(null);

  const handleSalonBuscado = (salon) => {
    setSalonBuscado(salon); // Actualiza el estado con el salón seleccionado
  };

  const handleClick = (nodo) => {
    setSelectedNode(nodo);
  };

  useEffect(() => {
    const fetchNodos = async () => {
      try {
        const data = await obtenerNodos();
        setNodos(data);
      } catch (error) {
        console.error('Error al cargar los nodos', error);
      }
    };

    fetchNodos();
  }, []);

  const [selectedArista, setSelectedArista] = useState(null);
  const [aristas, setAristas] = useState([]);
  useEffect(() => {
    const fetchAristas = async () => {
      try {
        const data = await obtenerAristas();
        setAristas(data);
      } catch (error) {
        console.error('Error al cargar los nodos', error);
      }
    };

    fetchAristas();
  }, []);

  return (
    <div className="mapa">

      <Buscador handleFunction={handleSalonBuscado} className="buscador"></Buscador>

      <Canvas
  style={{ height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0' }}
  // Posición inicial de la cámara: ligeramente por encima del suelo, como la perspectiva de un jugador
  camera={{ position: [-10, 150, 0], fov: 50 }}
>
  {/* Luces para iluminar la escena */}
  <ambientLight intensity={0.3} />
  <directionalLight position={[5, 5, 5]} />
  <directionalLight position={[-5, -5, -5]} />
  {/* Configuración de FirstPersonControls */}
  {/* <FirstPersonControls
    lookSpeed={0.1} // Velocidad del movimiento al mirar
    movementSpeed={50} // Velocidad al moverse
    rollSpeed={0.5} // Velocidad al rotar
    autoForward={false} // Evita moverse automáticamente
    dragToLook={true} // Permite mirar sin arrastrar
  /> */}
  <OrbitControls enableDamping dampingFactor={0.1} />
  {/* Grilla para orientación */}
  <Grid
    position={[0, 0.01, 0]}
    args={[20, 20]}
    cellSize={1}
    cellThickness={1}
    cellColor="gray"
    sectionSize={5}
    sectionThickness={1.5}
    sectionColor="black"
    infiniteGrid={true}
    fadeDistance={50}
  />

  {/* Piso */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
    <planeGeometry args={[2000, 2000]} /> {/* Aumentamos el tamaño */}
    <meshStandardMaterial color="white" />
  </mesh>
  {/* Modelo y Marcadores */}
  <Modelo archivo={'ESCUELA3  V3.glb'} posicion={[0,0,0]}/>

    {salonBuscado && (
      <Modelo archivo={'logo.glb'} posicion={[salonBuscado.coordenadaX,salonBuscado.coordenadaY +2.5,salonBuscado.coordenadaZ]} animar={true}/>
      )}

  

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
  <Marcador
      position={[362, 19.2, -105]}
      color="red"
      radius={1}
      thickness={0.1}
      onClick={() => handleClick(nodo)}
  />
  {aristas.map((arista, index) => (
    <RouteLine
      key={index}
      nodoOrigen={arista.nodoOrigen}
      nodoDestino={arista.nodoDestino}
    />
  ))}
</Canvas>

      <Reloj className='reloj' />

      {selectedNode && (
          <Modal show='true' onHide='false'>
            <Modal.Header>
              <Modal.Title>Información del Nodo Seleccionado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Coordenadas: ({selectedNode.coordenadaX}, {selectedNode.coordenadaY}, {selectedNode.coordenadaZ})</p>
              <p>Numero: {selectedNode.nombre}</p>
              <p>Tipo: {selectedNode.tipo}</p>
              <p>Id: {selectedNode.id}</p>
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
}

export default Mapa;
