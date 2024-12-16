import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, Grid } from '@react-three/drei';
import { Modelo } from '../components/mapa/Modelo';
import React, { useState, useEffect, useCallback } from 'react';
import { Vector3 } from 'three';
import { obtenerNodos } from '../api/nodos';
import { obtenerAristas } from '../api/aristas';
import { obtenerRuta } from '../api/rutas';
import Reloj from '../components/mapa/Reloj';
import Marcador from '../components/mapa/Marcador';
import Buscador from '../components/Buscador';
import RutaArista from '../components/mapa/RutaArista';
import { Modal, Button } from 'react-bootstrap';
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
  const [selectedNode, setSelectedNode] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [nodosData, aristasData, rutaData] = await Promise.all([
        obtenerNodos(),
        obtenerAristas(),
        obtenerRuta(nodoOrigen, nodoDestino),
      ]);
      setNodos(nodosData);
      setAristas(aristasData);
      setRuta(rutaData.ruta);
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSalonBuscado = (salon) => setSalonBuscado(salon);
  const handleClick = (nodo) => setSelectedNode(nodo);

  return (
    <div className="mapa">
      <Buscador handleFunction={handleSalonBuscado} className="buscador" />

      <Canvas
        style={{ height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0)' }}
        camera={{ position: [-10, 150, 0], fov: 50 }}
      >
        {nodos.filter(nodo => nodo.tipo !== '').map((nodo, index) => (
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
        <ambientLight intensity={0.3} />
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
        {aristas.map((arista, index) => (
          <Aristas
            key={index}
            nodoOrigen={arista.nodoOrigen}
            nodoDestino={arista.nodoDestino}
          />
        ))}
        {/* Modelo */}
        <Modelo archivo={'ESCUELA.glb'} posicion={[0, 0, 0]} />
        {salonBuscado && (
          <NodoBuscado
            coordenadaX={salonBuscado.coordenadaX}
            coordenadaY={salonBuscado.coordenadaY + 2.5}
            coordenadaZ={salonBuscado.coordenadaZ}
          />
        )}

        {/* Ruta */}
        {ruta.map((arista, index) => (
          <RutaArista key={index} nodoOrigen={arista.origen} nodoDestino={arista.destino} />
        ))}
      </Canvas>

      <Reloj className="reloj" />

      {selectedNode && (
        <Modal show={true} onHide={() => setSelectedNode(null)}>
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
};

export default Mapa;
