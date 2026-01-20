import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correção para os ícones padrão do Leaflet no ambiente Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Componente auxiliar para atualizar a visão do mapa quando as props mudarem.
 * O MapContainer do react-leaflet é imutável após a criação.
 */
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const MapComponent = ({ 
    center = [-23.5505, -46.6333], 
    zoom = 13, 
    markers = [] 
}) => {
    return (
        <div style={{ height: "100%", width: "100%", minHeight: "400px" }}>
            <MapContainer
                center={center} 
                zoom={zoom} 
                scrollWheelZoom={true} 
                style={{ 
                    height: "100%", 
                    width: "100%", 
                    borderRadius: "0.5rem", 
                    zIndex: 0 
                }}
            >
                {/* Atualiza a posição se center/zoom mudarem externamente */}
                <ChangeView center={center} zoom={zoom} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* O uso de Fragment aqui ajuda a evitar o erro de múltiplos filhos no Consumer */}
                <>
                    {markers && markers.length > 0 && markers.map((marker, idx) => (
                        <Marker 
                            key={`marker-${idx}`} 
                            position={marker.position}
                        >
                            <Popup>
                                <div dangerouslySetInnerHTML={{ 
                                    __html: marker.popupContent || "A pretty CSS3 popup. <br /> Easily customizable." 
                                }} />
                            </Popup>
                        </Marker>
                    ))}
                </>
            </MapContainer>
        </div>
    );
};

export default MapComponent;