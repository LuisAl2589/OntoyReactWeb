/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Line, OrbitControls, Grid } from '@react-three/drei';
import { FlyControls, PointerLockControls } from '@react-three/drei';
import { Vector3 } from 'three';

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
  const gltf = useLoader(GLTFLoader, 'escuelaedificios.glb');
  gltf.scene.position.set(150, 15, 0);

  return <primitive object={gltf.scene} scale={0.5} position={[0, 0, 0]} />;
}

function ModelViewer() {
  return (
    <Canvas 
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [0, 10, 10], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />

      <Grid 
        position={[0, 0, 0]}  // Posición de la cuadrícula
        args={[20, 20]}       // Tamaño de la cuadrícula: 20x20
        cellSize={1}          // Tamaño de cada celda
        cellThickness={1}     // Grosor de las líneas de celda
        cellColor="gray"      // Color de las líneas de celda
        sectionSize={5}       // Tamaño de las secciones mayores
        sectionThickness={1.5} // Grosor de las líneas de sección
        sectionColor="black"  // Color de las líneas de sección
        infiniteGrid={true}   // Si la cuadrícula debe ser infinita
        fadeDistance={50}     // Distancia a la que se desvanecen las líneas
      />

      <Model />
      <RouteLine />
    </Canvas>
  );
}

export default ModelViewer;
