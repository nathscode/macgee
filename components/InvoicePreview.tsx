// components/ComponentToPrint.tsx
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
		<div
			ref={ref}
			className="relative max-w-[700px] mx-auto bg-white text-black p-8 font-sans"
		>
			<div className="flex flex-col justify-center items-center w-full">
				<Image
					src={"/assets/images/logo/macgee.jpeg"}
					alt="logo"
					width={100}
					height={100}
				/>
			</div>

			{/* Header */}
			<div className="flex justify-between items-center mb-6 mt-4">
				<div className="flex flex-col font-light">
					{/* <p className="text-sm m-0 font-semibold">Macgee Trucks & Equipment</p> */}
					<p className="text-sm m-0 font-light">{site.address}</p>
					<p className="text-sm m-0 font-light">{site.state} state</p>
					<p className="text-sm m-0 font-light">Nigeria</p>
					<p className="text-sm m-0 font-light">enquiry@macgeeequipment.com</p>
				</div>
				<div className="text-right">
					<h3 className="text-3xl font-medium m-0">INVOICE</h3>
					<p className="m-0 font-medium mt-1">{`#INV-0000${invoiceNumber}`}</p>

					<div className="flex flex-col mt-4">
						<p className="m-0 text-right text-xs">Balance Due:</p>
						<p className="font-xl font-semibold m-0">
							{formatPrice(subtotal.toString())}
						</p>
					</div>
					<div className="flex flex-col mt-5 space-y-3">
						<p className="m-0 font-light text-right">
							<span className="mr-5">Invoice Date:</span>
							{formatDate(invoiceDate)}
						</p>
						<p className="m-0 font-light text-right">
							<span className="mr-5">Due Date: </span> {formatDate(dueDate)}
						</p>
					</div>
				</div>
			</div>
			{/* Bill To */}
			<div className="mb-6">
				<h4 className="font-light m-0">Bill To:</h4>
				<p className="m-0 font-semibold pt-1">{name}</p>
				<p className="m-0 font-light">{address}</p>
				<p className="m-0 font-light">{city}</p>
				<p className="m-0 mt-4 font-light">Subject: {subject}</p>
			</div>
			{/* Items Table */}
			<table className="w-full border-collapse mb-6">
				<thead>
					<tr className="bg-black text-white font-medium text-left">
						<th className="py-2 font-light" colSpan={1}>
							Item & description
						</th>
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
								<td className="py-2">{formatPrice(item.rate.toString())}</td>
								<td className="py-2">{formatPrice(amount.toString())}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* Totals */}
			<div className="flex justify-end">
				<div className="w-full sm:w-1/2">
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
	);
});

ComponentToPrint.displayName = "ComponentToPrint";
export default ComponentToPrint;
