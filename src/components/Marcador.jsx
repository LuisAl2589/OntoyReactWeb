function CircularMarker({ position, color, radius = 0.5, thickness = 0.1, onClick }) {
    return (
      <mesh position={position} rotation={[Math.PI, 0, 0]} onClick={onClick}>
        <cylinderGeometry args={[radius, radius, thickness, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
}
export default CircularMarker;