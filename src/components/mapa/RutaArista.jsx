import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import React, { useRef, useEffect, useState } from 'react';

function RutaArista({ nodoOrigen, nodoDestino }) {
  const [points, setPoints] = useState([]);
  const lineRef = useRef();

  // Definir los puntos de la línea
  const start = new Vector3(nodoOrigen.x, nodoOrigen.y, nodoOrigen.z);
  const end = new Vector3(nodoDestino.x, nodoDestino.y, nodoDestino.z);

  // Número de puntos para animación
  const numPoints = 10;

  useEffect(() => {
    const newPoints = [];
    for (let i = 0; i < numPoints; i++) {
      const t = (i + 1) / numPoints; // Proporción para cada punto
      const position = new Vector3().lerpVectors(start, end, t); // Interpolación entre los puntos
      newPoints.push(position);
    }
    setPoints(newPoints);
  }, [nodoOrigen, nodoDestino]);

  // Animación de la línea
  useFrame(() => {
    // Cambiar el color de la línea para crear un efecto de animación
    if (lineRef.current) {
      const time = performance.now() * 0.001;
      const r = Math.sin(time * 0.5) * 0.5 + 0.5;
      const g = Math.sin(time * 0.7) * 0.5 + 0.5;
      const b = Math.sin(time * 0.3) * 0.5 + 0.5;
      lineRef.current.material.color.setRGB(r, g, b);
    }
  });

  return (
    <>
      <Line
        ref={lineRef}
        points={[start, end]} // Puntos de la línea
        color="yellow"
        lineWidth={5}
        dashed={true}
      />

      {/* Añadir puntos animados a lo largo de la línea */}
      {points.map((point, index) => {
        const size = 0.1 + (Math.sin(index + performance.now() * 0.1) * 0.1 + 0.1); // Cambiar tamaño animado
        return (
          <mesh
            key={index}
            position={point}
            scale={[size, size, size]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={`rgb(${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())})`} />
          </mesh>
        );
      })}
    </>
  );
}

export default RutaArista;
