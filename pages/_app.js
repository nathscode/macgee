import { createContext } from "react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import useQuoteModal from "../hooks/useQuoteModal";
import QuoteModal from "../components/quote-modal";
import "../styles/main.css";
import "../styles/globals.css";

export const QuoteModalContext = createContext();

function MyApp({ Component, pageProps }) {
	const modal = useQuoteModal();
	return (
		<QuoteModalContext.Provider value={modal}>
			<NextNProgress color={"#FF0026"} height={2} showOnShallow={true} />
			<Component {...pageProps} />
			<QuoteModal />
			<Toaster />
		</QuoteModalContext.Provider>
	);
}

export default MyApp;
