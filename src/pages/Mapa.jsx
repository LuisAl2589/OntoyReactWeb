import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Line, OrbitControls, Grid } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Vector3 } from 'three';
import { obtenerNodos } from '../api/nodos';
import Reloj from '../components/Reloj';
import Marcador from '../components/Marcador';
function RouteLine() {
  const points = [
    new Vector3(0, 10, 0),
    new Vector3(1, 10, 1),
    new Vector3(3, 10, 0),
    new Vector3(5, 10, -1)
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
function Model() {
  const gltf = useLoader(GLTFLoader, 'escuela2.glb');
  gltf.scene.position.set(0, 0, 0);

  return <primitive object={gltf.scene} scale={0.5} position={[0, 0, 0]} />;
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

  return (
    <>
      <Canvas 
        style={{ height: '100vh', width: '100vw' }}
        camera={{ position: [50, 100, 10], fov: 50 }}
      >
        <ambientLight intensity={0.3} />
        <hemisphereLight skyColor="white" groundColor="lightblue" intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, 10, 10]} intensity={0.5} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={1}
          maxDistance={500}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.25}
          screenSpacePanning={true}
        />

        <Grid 
          position={[2.25, -2.5, -.75]} 
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
        <Model />
        {nodos.map((nodo, index) => (
          <Marcador 
            key={index}
            position={[nodo.coordenadaX, nodo.coordenadaY, nodo.coordenadaZ]}
            color="red"
            radius={1}
            thickness={0.1}
            onClick={() => handleClick(nodo)}
            on
          />
        ))}

        <RouteLine />
      </Canvas>
      <Reloj />
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
            zIndex: 1
          }}
        >
          <h2>Información del Nodo Seleccionado</h2>
          <p>Coordenadas: ({selectedNode.coordenadaX}, {selectedNode.coordenadaY}, {selectedNode.coordenadaZ})</p>
          <p>Numero: {selectedNode.nombre}</p>
          <p>Tipo: {selectedNode.tipo}</p>
          <button onClick={() => setSelectedNode(null)}>Cerrar</button>
        </div>
      )}
    </>
  );
}


export default Mapa;
