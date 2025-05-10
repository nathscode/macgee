"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import PageWrapper from "@/components/layout/page-wrapper";
import Wrapper from "@/components/layout/wrapper";
import { Loader2 } from "lucide-react";

const Contact = () => {
	const [data, setData] = useState({ fullname: "", email: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);

	const position: LatLngExpression = [5.5952, 5.8188];

	async function sendMessage(e: React.FormEvent) {
		e.preventDefault();

		try {
			setIsLoading(true);
			const response = await fetch("/api/send-message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const { status, message } = await response.json();

			if (status === true) {
				toast.success(message);
				setData({ fullname: "", email: "", message: "" });
			} else {
				throw new Error(message);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Wrapper>
			<PageWrapper page="Contact" path="/contact">
				<div className="content-wrapper">
					<section className="pager-body">
						<div className="pager-body__inner">
							<div className="contact">
								<div id="map" className="contact__map">
									<MapContainer
										center={position}
										zoom={13}
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
								{/* Rest of your contact form remains the same */}
							</div>
						</div>
					</section>
				</div>
			</PageWrapper>
		</Wrapper>
	);
};

export default Contact;
