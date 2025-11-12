/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { FC } from "react";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
interface MapProps {
  center?: [number, number] | L.LatLngExpression;
}

const Map: FC<MapProps> = ({ center }) => {
  const defaultCenter: L.LatLngExpression = [51.505, -0.09];
  const position: L.LatLngExpression = center || defaultCenter;

  return (
    <MapContainer
      center={position}
      zoom={center ? 6 : 2}
      scrollWheelZoom={true}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{center ? "Selected Location" : "Default Location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
