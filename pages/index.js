import Accordion from "../components/accordion"
import Banner from "../components/banner"
import Inventory from "../components/inventory"
import Wrapper from "../components/layout/wrapper"
import Services from "../components/services"
import Testimonial from "../components/testimonial"
import Works from "../components/works"

function Home() {
	return (
		<Wrapper>
			<Banner />
			<Works />
			<Inventory />
			<Services />
			<Testimonial />
			<Accordion />
		</Wrapper>
	)
}

export default Home
