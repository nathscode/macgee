import { Item } from "@/hooks/use-invoice";
import { site } from "@/lib/site";
import { formatDate, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { forwardRef } from "react";

type Props = {
	name: string;
	subject: string;
	invoiceDate: string;
	dueDate: string;
	invoiceNumber: string;
	address: string;
	city: string;
	items: Item[];
};

const ComponentToPrint = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {
		name,
		subject,
		invoiceDate,
		dueDate,
		invoiceNumber,
		address,
		city,
		items,
	} = props;

	const subtotal = items.reduce(
		(acc, item) => acc + Number(item.rate) * Number(item.quantity),
		0
	);

	return (
		<div className="w-full h-full overflow-auto px-4 py-6 sm:px-0">
			<div
				ref={ref}
				className="relative max-w-[700px] mx-auto bg-white text-black p-6 sm:p-8 font-sans"
			>
				{/* Logo */}
				<div className="flex flex-col justify-center items-center w-full">
					<img
						src="/assets/images/logo/macgee.jpeg"
						alt="logo"
						className="w-[100px] h-[80px] object-contain"
					/>
				</div>

				{/* Header */}
				<div className="flex justify-between flex-wrap items-start mb-6 mt-4 gap-4">
					<div className="flex flex-col font-light text-sm">
						<p className="m-0">{site.address}</p>
						<p className="m-0">{site.state} state</p>
						<p className="m-0">Nigeria</p>
						<p className="m-0">enquiry@macgeeequipment.com</p>
					</div>
					<div className="text-right text-sm">
						<h3 className="text-2xl font-medium m-0">INVOICE</h3>
						<p className="m-0 font-medium mt-1">{`#INV-0000${invoiceNumber}`}</p>

						<div className="mt-4">
							<p className="m-0 text-xs">Balance Due:</p>
							<p className="text-base font-semibold m-0">
								{formatPrice(subtotal.toString())}
							</p>
						</div>

						<div className="mt-4 space-y-2 text-xs">
							<p className="m-0">
								<span className="mr-2">Invoice Date:</span>
								{formatDate(invoiceDate)}
							</p>
							<p className="m-0">
								<span className="mr-2">Due Date:</span>
								{formatDate(dueDate)}
							</p>
						</div>
					</div>
				</div>

				{/* Bill To */}
				<div className="mb-6 text-sm">
					<h4 className="font-light m-0">Bill To:</h4>
					<p className="m-0 font-semibold pt-1 capitalize">{name}</p>
					<p className="m-0">{address}</p>
					<p className="m-0 capitalize">{city}</p>
					<p className="m-0 mt-4">Subject: {subject}</p>
				</div>

				{/* Items Table */}
				<div className="overflow-auto">
					<table className="w-full border-collapse mb-6 text-sm">
						<thead>
							<tr className="bg-black text-white font-medium text-left">
								<th className="py-2 font-light">Item & Description</th>
								<th className="py-2 font-light">Qty</th>
								<th className="py-2 font-light">Rate</th>
								<th className="py-2 font-light">Amount</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, i) => {
								const amount = Number(item.quantity) * Number(item.rate);
								return (
									<tr key={i} className="border-b border-gray-200">
										<td className="py-2">{item.item}</td>
										<td className="py-2">{item.quantity}</td>
										<td className="py-2">
											{formatPrice(item.rate.toString())}
										</td>
										<td className="py-2">{formatPrice(amount.toString())}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				{/* Totals */}
				<div className="flex justify-end">
					<div className="w-full sm:w-1/2 text-sm">
						<div className="flex justify-between py-1">
							<span>Subtotal:</span>
							<span>{formatPrice(subtotal.toString())}</span>
						</div>
						<div className="flex justify-between py-1">
							<span>Total:</span>
							<span>{formatPrice(subtotal.toString())}</span>
						</div>
						<div className="flex justify-between py-1 font-bold bg-slate-100">
							<span>Balance Due:</span>
							<span>{formatPrice(subtotal.toString())}</span>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-left mt-10 text-xs text-gray-600">
					<p className="font-light m-0">Note:</p>
					<p className="font-light m-0 mt-1">Thank you for your business!</p>
				</div>
			</div>
		</div>
	);
});

ComponentToPrint.displayName = "ComponentToPrint";
export default ComponentToPrint;
