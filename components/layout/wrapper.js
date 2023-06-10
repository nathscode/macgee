import { ScrollToTop } from "../ScrollToTop";
import Footer from "./footer";
import Header from "./header";

function Wrapper({ children }) {
	return (
		<>
			<Header />
			{children}
			<ScrollToTop />
			<Footer />
		</>
	);
}

export default Wrapper;
