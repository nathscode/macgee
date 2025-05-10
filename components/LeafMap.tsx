import React, { Suspense, lazy } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const LeafletMapWithClusters: React.FC<{
	center: [number, number];
	markers: [number, number];
}> = ({ center, markers, ...options }) => {
	return (
		<Suspense fallback={<div className="h-[200px]" />}>
			<MapContainer center={center} zoom={13} scrollWheelZoom={false}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={markers}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</Suspense>
	);
};
