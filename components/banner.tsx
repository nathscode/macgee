import Image from "next/image";
import Link from "next/link";

function Banner() {
	return (
		<section className="banner">
			<Image
				fill
				src="/assets/images/hero/hero.jpg"
				alt="Five developers at work."
			/>
			<section className="banner__text">
				<div className="banner__text__inner">
					<div className="mb-2 hero-text">
						<span>buy new or used machinery&rsquo;s</span>
					</div>
					<h1>MacGee</h1>
					<div className="hero-text-sub">
						<h2>Trucks & equipment</h2>
					</div>
					<div className="hero-text-two">
						<span>
							<Link href="/service">our services</Link>
						</span>
					</div>
				</div>
			</section>
		</section>
	);
}

export default Banner;
