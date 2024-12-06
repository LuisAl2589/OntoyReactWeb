import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteLine = ({ ruta }) => {
    // ruta es un array de objetos { lat, lon }
    const [coordenadas, setCoordenadas] = useState([]);

    useEffect(() => {
        if (ruta) {
            const newCoordenadas = ruta.map((nodo) => {[                
                nodo.coordenadas.y,
                nodo.coordenadas.x, 
                nodo.coordenadas.z 
            ]});
            setCoordenadas(newCoordenadas);
        }
    }, [ruta]);

    return (
        <MapContainer center={[0, 0]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Dibuja la línea de la ruta */}
            <Polyline positions={coordenadas} color="blue" weight={4} />
        </MapContainer>
    );
};

export default RouteLine;
