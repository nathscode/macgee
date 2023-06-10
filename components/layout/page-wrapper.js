import Accordion from "../accordion";
import Pager from "./pager";
import Header from "../layout/header";
import Footer from "./footer";
import { ScrollToTop } from "../ScrollToTop";

function PageWrapper({ path, page, children }) {
	return (
		<>
			<Header />
			<Pager path={path} page={page} />
			{children}
			<Accordion />
			<ScrollToTop />
			<Footer />
		</>
	);
}

export default PageWrapper;
