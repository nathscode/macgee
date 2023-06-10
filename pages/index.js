import Accordion from "../components/accordion";
import Banner from "../components/banner";
import Gallery from "../components/gallery";
import Inventory from "../components/inventory";
import Wrapper from "../components/layout/wrapper";
import Partners from "../components/partners";
import Services from "../components/services";
import Testimonial from "../components/testimonial";
import Works from "../components/works";

function Home() {
	return (
		<Wrapper>
			<Banner />
			<Partners />
			<Works />
			<Inventory />
			<Services />
			<Testimonial />
			<Accordion />
			<Gallery />
		</Wrapper>
	);
}

export default Home;
