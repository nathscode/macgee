"use client";
import { ReactNode, createContext } from "react";
import { ToastProvider } from "@/providers/toast-provider";

import useQuoteModal from "@/hooks/useQuoteModal";
import QuoteModal from "@/components/quote-modal";

import { Provider } from "react-redux";
import { store } from "@/lib/store";

export const QuoteModalContext = createContext({});

export default function ProviderWrapper({ children }: { children: ReactNode }) {
	const modal = useQuoteModal();
	return (
		<Provider store={store}>
			<QuoteModalContext.Provider value={modal}>
				<ToastProvider />
				{children}
				<QuoteModal />
			</QuoteModalContext.Provider>
		</Provider>
	);
}
