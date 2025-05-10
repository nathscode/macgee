import { forwardRef } from "react";
import { Item, invoiceDataType } from "@/hooks/use-invoice";
import ComponentToPrint from "./InvoicePreview";

interface PrintableComponentProps {
	items: Item[];
	invoiceData: invoiceDataType;
}

// Properly handled ref forwarding
const PrintableComponent = forwardRef<HTMLDivElement, PrintableComponentProps>(
	({ items, invoiceData }, ref) => {
		// Create a div that directly receives the ref
		return (
			<div ref={ref}>
				<ComponentToPrint
					items={items}
					name={invoiceData.name || ""}
					subject={invoiceData.subject || ""}
					invoiceDate={invoiceData.invoiceDate || ""}
					dueDate={invoiceData.dueDate || ""}
					invoiceNumber={invoiceData.invoiceNumber || ""}
					address={invoiceData.address || ""}
					city={invoiceData.city || ""}
				/>
			</div>
		);
	}
);

PrintableComponent.displayName = "PrintableComponent";
export default PrintableComponent;
