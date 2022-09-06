import Link from "next/link"

function Pager({ page, path }) {
	return (
		<div className='pager'>
			<div className='pager__image pager-overlay' style={{ backgroundImage: "url(/assets/images/hero/cover-top.jpg)" }}>
				<div className='content-wrapper'>
					<div className='pager__text'>
						<h2>{page}</h2>
						<nav>
							<ul>
								<li>
									<Link href='/'>
										<a>Home</a>
									</Link>
								</li>
								<li>
									<Link href={path}>
										<a>{page}</a>
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Pager
