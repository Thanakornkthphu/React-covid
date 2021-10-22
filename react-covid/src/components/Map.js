import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer, useMap} from 'react-leaflet';
import { showDataOnMap } from './Function';


  
function Map({ countries, casesType, center, zoom }) {

    const ChangeMap = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null
    };

    return (
        <div className="map">
            <LeafletMap > 
            <ChangeMap center={center} zoom={zoom} scrollWheelZoom={false}/>   
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
