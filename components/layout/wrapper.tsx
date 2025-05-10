import { ScrollToTop } from "../ScrollToTop";
import Navbar from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ReactNode } from "react";
function Wrapper({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
			<ScrollToTop />
		</>
	);
}

export default Wrapper;
