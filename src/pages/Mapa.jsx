import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Line, FirstPersonControls, Grid, OrbitControls } from '@react-three/drei';
import React, { useState, useEffect } from 'react';
import { Vector3 } from 'three';
import { obtenerNodos } from '../api/nodos';
import { obtenerAristas } from '../api/aristas';
import Reloj from '../components/Reloj';
import Marcador from '../components/Marcador';
import Buscador from '../components/Buscador';
import './css/mapa.css';

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
      dashed={false}
    />
  );
}

function Model({ archivo, posicion, animar }) {
  const gltf = useLoader(GLTFLoader, archivo);
  const ref = React.useRef(); // Crear una referencia para el modelo
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(0, Math.PI / 2, 0); // Ajusta la rotación inicial: (x, y, z)
    }
  }, []);
  // Añadir rotación al modelo si "animar" es verdadero
  useFrame(() => {
    if (animar && ref.current) {
      ref.current.rotation.y += 0.01; // Rota en el eje Y
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.5} position={posicion} />;
}

function Mapa() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodos, setNodos] = useState([]);

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
      <Buscador className="buscador"></Buscador>

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
    position={[0, -0.01, 0]}
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
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial color="green" />
  </mesh>

  {/* Modelo y Marcadores */}
  <Model archivo={'ESCUELA3  V3.glb'} posicion={[0,0,0]}/>
  <Model archivo={'logo.glb'} posicion={[20,20,0]} animar={true}/>
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
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1,
          }}
        >
          <h2>Información del Nodo Seleccionado</h2>
          <p>Coordenadas: ({selectedNode.coordenadaX}, {selectedNode.coordenadaY}, {selectedNode.coordenadaZ})</p>
          <p>Numero: {selectedNode.nombre}</p>
          <p>Tipo: {selectedNode.tipo}</p>
          <button onClick={() => setSelectedNode(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default Mapa;
