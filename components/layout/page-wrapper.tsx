import Accordion from "../accordion";
import Pager from "./pager";
import { ScrollToTop } from "../ScrollToTop";
import { ReactNode } from "react";

const PageWrapper = ({
	path,
	page,
	children,
}: {
	path: string;
	page: string;
	children: ReactNode;
}) => {
	return (
		<>
			<Pager path={path} page={page} />
			{children}
			<Accordion />
			<ScrollToTop />
		</>
	);
};

export default PageWrapper;
