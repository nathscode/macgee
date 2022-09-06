import { useState } from "react"
import testimonials from "../data/testimonials.json"

function Testimonial() {
	const [current, setCurrent] = useState(0)
	const [testimony, setTestimony] = useState(testimonials[0])

	function moveToNext() {
		if (current < testimonials.length - 1) {
			setCurrent((prev) => {
				setTestimony(testimonials[prev + 1])
				return prev + 1
			})
		}
	}

	function moveToPrev() {
		if (current > 0) {
			setCurrent((prev) => {
				setTestimony(testimonials[prev - 1])
				return prev - 1
			})
		}
	}
	return (
		<section className='testimonial'>
			<div className='content-wrapper'>
				<div className='testimonial__header'>
					<h2>Testimonial</h2>
					<p>What our client speak of us</p>
				</div>
				<div className='testimonial__list'>
					<div className='testimonial__list__item'>
						<div className='testimonial__list__item--top'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
								width='86px'
								height='63px'>
								<path
									fillRule='evenodd'
									strokeWidth='1px'
									d='M82.623,59.861 L48.661,59.861 L48.661,25.988 L59.982,3.406 L76.963,3.406 L65.642,25.988 L82.623,25.988 L82.623,59.861 ZM3.377,25.988 L14.698,3.406 L31.679,3.406 L20.358,25.988 L37.340,25.988 L37.340,59.861 L3.377,59.861 L3.377,25.988 Z'></path>
							</svg>
							<p>{testimony.content}</p>
						</div>
						<div className='testimonial__list__item--bottom'>
							<div className='client-text'>
								<h4>{testimony.name}</h4>
								<p>{testimony.profession}</p>
							</div>
							<div className='navigator'>
								<span onClick={moveToPrev} style={current === 0 ? hideNav : {}}>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
										<path fill='none' d='M0 0h24v24H0z' />
										<path d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0-9h4v2h-4v3l-4-4 4-4v3z' />
									</svg>
								</span>
								<span onClick={moveToNext} style={current === testimonials.length - 1 ? hideNav : {}}>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
										<path fill='none' d='M0 0h24v24H0z' />
										<path d='M12 11V8l4 4-4 4v-3H8v-2h4zm0-9c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z' />
									</svg>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const hideNav = {
	opacity: 0.1,
	cursor: "not-allowed",
}

export default Testimonial
