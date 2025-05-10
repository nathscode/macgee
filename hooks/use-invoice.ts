import { create } from "zustand";

export interface Item {
	item: string;
	quantity: string;
	rate: number;
}

export interface invoiceDataType {
	name: string;
	subject: string;
	invoiceDate: string;
	dueDate: string;
	invoiceNumber: string;
	address: string;
	city: string;
}

interface InvoiceState {
	items: Item[];
	invoiceData: invoiceDataType;
	setItems: (items: Item[]) => void;
	setInvoiceData: (invoiceData: invoiceDataType) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
	items: [],
	invoiceData: {
		name: "",
		subject: "",
		invoiceDate: "",
		dueDate: "",
		invoiceNumber: "",
		address: "",
		city: "",
	},
	setItems: (items) => set({ items }),
	setInvoiceData: (invoiceData) => set({ invoiceData }),
}));
