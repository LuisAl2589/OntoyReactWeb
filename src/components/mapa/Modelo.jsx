import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export function Modelo({ archivo, posicion = [0, 0, 0], animar = false }) {
    const { scene } = useGLTF(archivo);
    const ref = useRef();
    const clonedScene = useRef();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (scene && !clonedScene.current) {
            clonedScene.current = scene.clone();  
            setIsReady(true);
        }
    }, [scene]);

    useEffect(() => {
        if (isReady && clonedScene.current) {
            clonedScene.current.rotation.set(0, Math.PI / 2, 0); 
        }
    }, [isReady]);

    useFrame(() => {
        if (animar && clonedScene.current) {
            clonedScene.current.rotation.y += 0.01; 
        }
    });

    return isReady ? (
        <primitive ref={ref} object={clonedScene.current} position={posicion} />
    ) : null;
}
