import Link from "next/link";

function Banner() {
	return (
		<section className="banner">
			<img src="assets/images/hero/hero.jpg" alt="Five developers at work." />
			<section className="banner__text">
				<div className="banner__text__inner">
					<div className="hero-text">
						<span>buy new or used machinery's</span>
					</div>
					<h1>MacGee</h1>
					<div className="hero-text-sub">
						<h2>Equipment</h2>
					</div>
					<div className="hero-text-two">
						<span>
							<Link href="/service">
								<a>our services</a>
							</Link>
						</span>
					</div>
				</div>
			</section>
		</section>
	);
}

export default Banner;
