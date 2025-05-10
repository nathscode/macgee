export const dynamic = "force-dynamic";
import ContactForm from "@/components/forms/contact-form";
import PageWrapper from "@/components/layout/page-wrapper";
import Wrapper from "@/components/layout/wrapper";
import MapWrapper from "./mapClient";

const Contact = async () => {
	return (
		<Wrapper>
			<PageWrapper page="Contact" path="/contact">
				<div className="content-wrapper">
					<section className="pager-body">
						<div className="pager-body__inner">
							<div className="contact">
								<MapWrapper />
								<h4>Get in Touch</h4>
								<ContactForm />
							</div>
						</div>
					</section>
				</div>
			</PageWrapper>
		</Wrapper>
	);
};

export default Contact;
