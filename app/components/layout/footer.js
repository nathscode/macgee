import Link from "next/link"

function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__inner'>
				<div className='footer__about'>
					<h4>About</h4>
					<p>
						For over 15 years, Macgee trucks and equipment have built a reputation around Nigeria for offering only the
						highest quality earthmoving machinery, parts, trucks, and attachments to our valued customers.
					</p>
				</div>
				<div className='footer__navigation'>
					<ul className='footer__navigation__list'>
						<h4>Quick Links</h4>
						<li>
							<Link href='/about'>
								<a>About</a>
							</Link>
						</li>
						<li>
							<Link href='/service'>
								<a>Services</a>
							</Link>
						</li>
						<li>
							<Link href='/inventory'>
								<a>Inventory</a>
							</Link>
						</li>
						<li>
							<Link href='/contact'>
								<a>Contact Us</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className='footer__contacts'>
					<h4>Contacts</h4>
					<p>Km 6, osubi-airport road, Warri, Delta state, Nigeria.</p>
					<div>
						<span>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z' />
							</svg>
						</span>
						<a href='tel:+2347039945629'>0703 994 5629</a>
					</div>
					<div>
						<span>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M7 2h11a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V0h2v2zm0 2v5h10V4H7z' />
							</svg>
						</span>
						<a href='tel:+2347035846669'>07035846669</a>
					</div>
					<div>
						<span>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z' />
							</svg>
						</span>
						<a href='mailto:enquiry@macgeeequipment.com'>enquiry@macgeeequipment.com</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
