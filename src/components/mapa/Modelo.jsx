import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import React, { useEffect } from 'react';
export function Modelo({ archivo, posicion, animar }) {
    const gltf = useLoader(GLTFLoader, archivo);
    const ref = React.useRef(); // Crear una referencia para el modelo
    useEffect(() => {
      if (ref.current) {
        ref.current.rotation.set(0, Math.PI / 2, 0);
      }
    }, []);
    useFrame(() => {
      if (animar && ref.current) {
        ref.current.rotation.y += 0.01;
      }
    });
  
    return <primitive ref={ref} object={gltf.scene} scale={0.5*2} position={posicion} />;
}
