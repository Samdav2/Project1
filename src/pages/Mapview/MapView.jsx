import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Placeholder marker icon
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

const MapView = () => {
  const defaultIcon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="map-view">
      <h3>Explore Events on Map</h3>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]} icon={defaultIcon}>
          <Popup>Event Location: Example Event</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
