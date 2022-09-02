import { useState } from "react"
import Head from "next/head"
import Script from "next/script"
import { TailSpin } from "react-loader-spinner"
import { toast } from "react-hot-toast"
import PageWrapper from "../components/layout/page-wrapper"

function Contact() {
	const [data, setData] = useState({ fullname: "", email: "", message: "" })
	const [isLoading, setIsLoading] = useState(false)

	function drawMap() {
		const lat = 5.5952
		const lng = 5.8188

		// Initialize locationPicker plugin
		const map = L.map("map").setView([lat, lng], 13)

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: "macgee equipments",
		}).addTo(map)

		const layer = L.marker([lat, lng]).addTo(map)
	}

	async function sendMessage(e) {
		e.preventDefault()

		try {
			setIsLoading(true)
			const response = await fetch("/api/send-message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})

			const { status, message } = await response.json()

			if (status === true) {
				toast.success(message)
				setData({ fullname: "", email: "", message: "" })
				setIsLoading(false)
			} else {
				throw new Error(message)
			}
		} catch (error) {
			setIsLoading(false)
			toast.error(error.message)
		}
	}

	return (
		<PageWrapper page='Contact' path='/contact'>
			<Head>
				<link
					rel='stylesheet'
					href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
					integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
					crossorigin=''
				/>
			</Head>
			<div className='content-wrapper'>
				<section className='pager-body'>
					<div className='pager-body__inner'>
						<div className='contact'>
							<div id='map' className='contact__map'>
								<p>Loading...</p>
							</div>
							<h4>Get in Touch</h4>
							<div className='contact__inner'>
								<div className='contact__form-box'>
									<form onSubmit={sendMessage} method='post'>
										<div className='full'>
											<div className='split-two'>
												<input
													disabled={isLoading}
													value={data.fullname}
													onChange={(e) => setData({ ...data, fullname: e.target.value })}
													type='text'
													placeholder='Enter full name'
												/>
											</div>
											<div className='split-two'>
												<input
													disabled={isLoading}
													value={data.email}
													onChange={(e) => setData({ ...data, email: e.target.value })}
													type='text'
													placeholder='Enter email address'
												/>
											</div>
										</div>
										<div className='full'>
											<textarea
												disabled={isLoading}
												value={data.message}
												onChange={(e) => setData({ ...data, message: e.target.value })}
												cols={30}
												rows={10}
												placeholder='Enter message'
											/>
										</div>
										<div>
											<button
												disabled={isLoading}
												type='submit'
												className='site-button site-button-primary'>
												{isLoading ? (
													<TailSpin width={20} height={20} color='#fff' />
												) : (
													"Send Message"
												)}
											</button>
										</div>
									</form>
								</div>
								<div className='contact__info'>
									<div className='contact__info__item'>
										<div className='contact__info__item--icon'>
											<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
												<path fill='none' d='M0 0h24v24H0z' />
												<path d='M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' />
											</svg>
										</div>
										<div className='contact__info__item--text'>
											<h3>Osubi, Delta State. </h3>
											<p>Km 6, osubi-airport road, Warri, Delta state, Nigeria.</p>
										</div>
									</div>
									<div className='contact__info__item'>
										<div className='contact__info__item--icon'>
											<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
												<path fill='none' d='M0 0h24v24H0z' />
												<path d='M21 16.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.901 13.901 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.901 13.901 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498z' />
											</svg>
										</div>
										<div className='contact__info__item--text'>
											<h3>
												<a href='tel:+2347035846669'>07035846669</a>
											</h3>
											<p>Mon to Fri 8am to 6pm</p>
										</div>
									</div>
									<div className='contact__info__item'>
										<div className='contact__info__item--icon'>
											<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
												<path fill='none' d='M0 0h24v24H0z' />
												<path d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z' />
											</svg>
										</div>
										<div className='contact__info__item--text'>
											<h3>
												<a href='mailto:enquiry@macgeeequipment.com'>enquiry@macgeeequipment.com</a>
											</h3>
											<p>Send us your query anytime!</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Script
				src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
				integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
				crossorigin=''
				onLoad={drawMap}
			/>
		</PageWrapper>
	)
}

export default Contact
