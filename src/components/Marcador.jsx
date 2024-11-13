import { useState } from 'react';

function CircularMarker({ position, color, radius = 0.5, thickness = 0.1, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <mesh 
            position={position} 
            rotation={[Math.PI, 0, 0]} 
            onClick={onClick} 
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)}
        >
            <cylinderGeometry args={[radius, radius, thickness, 32]} />
            <meshStandardMaterial color={hovered ? 'blue' : color} />
        </mesh>
    );
}

export default CircularMarker;
