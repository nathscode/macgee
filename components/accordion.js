function Accordion() {
	return (
		<section className="accordion">
			<div className="content-wrapper">
				<div className="accordion__header">
					<h2>Frequently Asked Questions</h2>
					<p>
						Helps you to find quality trucks. But I must explain to you how all
						this mistaken
					</p>
				</div>
				<div className="accordion__tabs">
					<div className="accordion__tabs__tab">
						<input type="radio" id="rd1" name="rd" />
						<label className="tab--label" htmlFor="rd1">
							Do you sell replacement parts?
						</label>
						<div className="tab--content">
							Yes, truck and equipment parts are available.
						</div>
					</div>
					<div className="accordion__tabs__tab">
						<input type="radio" id="rd2" name="rd" />
						<label className="tab--label" htmlFor="rd2">
							What is tons?
						</label>
						<div className="tab--content">Tons is weight of a truck</div>
					</div>
					<div className="accordion__tabs__tab">
						<input type="radio" id="rd2" name="rd" />
						<label className="tab--label" htmlFor="rd2">
							Can you deliver my purchase?
						</label>
						<div className="tab--content">
							Yes, immediately after your quotation is reviewed and payment is
							made, we deliver to your site.
						</div>
					</div>
					<div className="accordion__tabs__tab">
						<input type="radio" id="rd2" name="rd" />
						<label className="tab--label" htmlFor="rd2">
							Is servicing available after purchase?
						</label>
						<div className="tab--content">
							Yes, the truck will be serviced before we deliver it to your
							destination.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Accordion;
