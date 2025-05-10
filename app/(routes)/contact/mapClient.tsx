"use client";
import { LatLngExpression } from "leaflet";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapWrapper = () => {
	const mapRef = useRef(null);

	const position: LatLngExpression = [5.5952, 5.8188];

	return (
		<div id="map" className="contact__map">
			<MapContainer
				center={position}
				zoom={13}
				ref={mapRef}
				scrollWheelZoom={false}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						Macgee Equipment <br /> Osubi, Delta State
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default MapWrapper;
