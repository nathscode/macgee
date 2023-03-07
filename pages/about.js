import PageWrapper from "../components/layout/page-wrapper";

function About() {
	return (
		<PageWrapper page="About" path="/about">
			<div className="content-wrapper">
				<section className="pager-body">
					<div className="pager-body__inner">
						<div className="pager-body__content">
							<h2>Who we are</h2>
							<p>
								For over 17 years, Macgee trucks and equipment have built a
								reputation around Nigeria for offering only the highest quality
								earthmoving machinery, parts, trucks, and attachments to our
								valued customers.
							</p>
							<p className="space">
								In recent years, Macgee has gained a reputation as a supplier of
								value for money and an earth-moving solutions company with the
								highest standards of quality, with a dedicated and committed
								staff driven by excellence in all our dealings and managing
								ongoing relationships with our customers.
							</p>
							<h4>Our Mission</h4>
							<p className="space">
								We are dedicated to offering our valued customers the highest
								and best quality earthmoving machinery and providing profitable
								solutions.
							</p>
							<h4>Our Vision</h4>
							<p className="space">
								Delivering all-around earthwork services, equipment, and
								experts.
							</p>
							<h4>Core Values</h4>
							<p>
								<strong>Credibility</strong> <br />
								We have been operating for more than a decade and have created a
								community of satisfied customers.
							</p>
							<p>
								<strong>Integrity</strong> <br />
								Trust and honesty. We showcase value in our work and
								relationship.
							</p>
							<p>
								<strong>Dedication</strong> <br />
								We are dedicated to task to achieve results.
							</p>
							<p>
								<strong>Performance</strong> <br />
								We involve a variety of techniques in establishing deliverables
								and maintaining time constraints.
							</p>
							<div
								className="pager-body__content__metrics"
								style={{ marginTop: "30px" }}
							>
								<div className="pager-body__content__metrics__item">
									<h4>17+</h4>
									<p>Years in Business</p>
								</div>
								<div className="pager-body__content__metrics__item">
									<h4>500+</h4>
									<p>Trucks and parts sold</p>
								</div>
								<div className="pager-body__content__metrics__item">
									<h4>100+</h4>
									<p>Trucks on sales</p>
								</div>
								<div className="pager-body__content__metrics__item">
									<h4>200+</h4>
									<p>Satisfied customers</p>
								</div>
							</div>
						</div>
						<div className="pager-body__visual">
							<img src="assets/images/hero/about-hero.jpg" alt="" />
						</div>
					</div>
				</section>
			</div>
		</PageWrapper>
	);
}

export default About;
