function Accordion() {
	return (
		<section className='accordion'>
			<div className='content-wrapper'>
				<div className='accordion__header'>
					<h2>Frequently Asked Questions</h2>
					<p>Helps you to find quality trucks. But I must explain to you how all this mistaken</p>
				</div>
				<div className='accordion__tabs'>
					<div className='accordion__tabs__tab'>
						<input type='radio' id='rd1' name='rd' />
						<label className='tab--label' htmlFor='rd1'>
							Where is MacGee Located
						</label>
						<div className='tab--content'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, facilis.</div>
					</div>
					<div className='accordion__tabs__tab'>
						<input type='radio' id='rd2' name='rd' />
						<label className='tab--label' htmlFor='rd2'>
							Where is MacGee Located
						</label>
						<div className='tab--content'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, facilis.</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Accordion
