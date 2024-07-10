"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import locationIcon from '../../../public/images/icon-location.svg';
import { IPData } from '../utils/types';
import { useEffect } from 'react';

interface MapProps {
    position: [number, number];
    ipData: IPData | null;
}

// auto update map when position changes
const MapUpdater: React.FC<{ position: [number, number] }> = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);
    }, [position, map]);
    return null;
};

const Map: React.FC<MapProps> = ({ position, ipData }) => {
    const customIcon = icon({
        iconUrl: locationIcon.src, // Ensure the icon URL is correctly set
        iconSize: [40, 40], // Adjust the size as needed
    });

    return (
        <MapContainer center={position} zoom={13} style={{ height: "65vh", width: "100%" }}>
            <TileLayer 
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution="&copy; OpenStreetMap contributors"
            />
            <MapUpdater position={position} />
            {ipData && (
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        {ipData.location.city}, 
                        {ipData.location.country}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;