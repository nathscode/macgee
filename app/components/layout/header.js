import Link from "next/link"
import { useContext } from "react"
import { QuoteModalContext } from "../../pages/_app"

function Header() {
	const { showModal } = useContext(QuoteModalContext)
	return (
		<header className='header'>
			<div className='header__default'>
				<div className='content-wrapper'>
					<div className='header__default__inner'>
						<div className='header__default--logo'>
							<Link href='/'>
								<a title='MacGee Trucks and Equipment' rel='home'>
									<img src='/assets/images/logo/macgee.jpeg' alt='MacGee Trucks and Equipment' />
								</a>
							</Link>
						</div>
						<div className='header__default--info'>
							<div className='header-widget widget-show'>
								<div className='header-widget__icon'>
									<svg xmlns='http://www.w3.org/2000/svg'>
										<path d='M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z' />
									</svg>
								</div>
								<div className='header-widget__text'>
									<p>For enquiry mail us</p>
									<a href='mailto:enquiry@macgeeequipment.com'>enquiry@macgeeequipment.com</a>
								</div>
							</div>
							<div className='header-widget widget-show'>
								<div className='header-widget__icon'>
									<svg xmlns='http://www.w3.org/2000/svg'>
										<path d='m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z' />
									</svg>
								</div>
								<div className='header-widget__text'>
									<p>Service helpline call us</p>
									<a href='tel:+234703994 5629'>+23407039945629</a>
								</div>
							</div>
							<div className='quote-button'>
								<button onClick={showModal} className='site-button site-button-primary'>
									Get a Quote
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav className='header__navigation'>
				<div className='content-wrapper'>
					<div className='desktop-nav'>
						<ul className='header__navigation__list desktop'>
							<li className='header__navigation__list__item'>
								<Link href='/'>
									<a className='header__navigation__list__item--link'>Home</a>
								</Link>
							</li>
							<li className='header__navigation__list__item'>
								<Link href='/inventory'>
									<a className='header__navigation__list__item--link'>Inventory</a>
								</Link>
							</li>
							<li className='header__navigation__list__item'>
								<Link href='/about'>
									<a className='header__navigation__list__item--link'>About Us</a>
								</Link>
							</li>
							<li className='header__navigation__list__item'>
								<Link href='/contact'>
									<a className='header__navigation__list__item--link'>Contact Us</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className='hamburger'>
						<button type='button'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={24} height={24}>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z' />
							</svg>
						</button>
					</div>
					<div className='mobile-nav'>
						<ul className='header__navigation__list'>
							<li className='header__navigation__list__item'>
								<Link href='/'>
									<a className='header__navigation__list__item--link'>Home</a>
								</Link>
							</li>
							<li className='header__navigation__list__item'>
								<Link href='/inventory'>
									<a className='header__navigation__list__item--link'>Inventory</a>
								</Link>
							</li>
							<li className='header__navigation__list__item'>
								<Link href='/about'>
									<a className='header__navigation__list__item--link'>About Us</a>
								</Link>
							</li>
							<li className='header__navigation__list__item'>
								<Link href='/contact'>
									<a className='header__navigation__list__item--link'>Contact Us</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
