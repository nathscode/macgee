"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInvoiceStore } from "@/hooks/use-invoice";
import { generateRandomNumbers } from "@/lib/backend/utils";
import { cn } from "@/lib/utils";
import { InvoiceSchema, InvoiceSchemaInfer } from "@/lib/validators/invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import html2pdf from "html2pdf.js";
import { CalendarIcon, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import PrintableComponent from "../PrintableComponent";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const InvoiceForm = () => {
	const { setItems, items, invoiceData, setInvoiceData } = useInvoiceStore();
	const [check, setCheck] = useState<boolean>(false);
	const [dateOpen, setDateOpen] = useState(false);
	const [dueDateOpen, setDueDateOpen] = useState(false);

	const handleSwitchChange = () => setCheck((prev) => !prev);

	// Create a stable ref for the printable component
	const componentRef = useRef<HTMLDivElement>(null);
	const newInvoiceTitle = generateRandomNumbers(2);
	const form = useForm<InvoiceSchemaInfer>({
		resolver: zodResolver(InvoiceSchema),
		defaultValues: {
			items: [{ item: "", quantity: "", rate: 0 }],
			name: "",
			subject: check
				? "We hereby write you on the quotation of a pro forma invoice"
				: "",
			invoiceNumber: newInvoiceTitle,
			invoiceDate: new Date(),
			dueDate: new Date(),
			address: "",
			city: "",
			isProforma: false,
		},
	});

	const {
		fields: itemFields,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: "items",
	});

	// Setup the print handler with proper ref handling

	// Regular form submission handler
	const onSubmit = (values: InvoiceSchemaInfer) => {
		setItems(values.items);
		setInvoiceData({
			name: values.name,
			subject: values.subject,
			invoiceDate: values.invoiceDate.toDateString(),
			dueDate: values.dueDate?.toDateString() || undefined,
			address: values.address,
			city: values.city,
			invoiceNumber: newInvoiceTitle,
			isProforma: values.isProforma,
		});
	};

	const handleDownloadPDF = async () => {
		if (!componentRef.current) {
			console.error("Printable component not ready");
			return;
		}

		const element = componentRef.current;
		const opt = {
			margin: 0.5,
			filename: `Macgee-Invoice-${invoiceData.invoiceNumber}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		};

		try {
			await html2pdf().from(element).set(opt).save();
		} catch (error) {
			console.error("Error generating PDF:", error);
		}
	};

	const formatNumber = (value: string | number) => {
		const numeric =
			typeof value === "number"
				? value.toString()
				: value.replace(/[^0-9.]/g, "");
		return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const parseNumber = (formatted: string) => {
		return parseFloat(formatted.replace(/,/g, ""));
	};

	return (
		<div className="flex flex-wrap justify-between w-full">
			<div className="w-full md:w-1/2 md:pr-5 mb-5 md:mb-0">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<Tabs defaultValue="items" className="w-full">
							<TabsList>
								<TabsTrigger value="items">Items</TabsTrigger>
								<TabsTrigger value="address">Address</TabsTrigger>
							</TabsList>

							<TabsContent value="items">
								{itemFields.map((field, index) => (
									<div
										key={field.id}
										className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
									>
										<FormField
											control={form.control}
											name={`items.${index}.item`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Item</FormLabel>
													<FormControl>
														<Input placeholder="Item name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`items.${index}.quantity`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Quantity</FormLabel>
													<FormControl>
														<Input placeholder="Quantity" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex gap-2">
											<FormField
												control={form.control}
												name={`items.${index}.rate`}
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Rate</FormLabel>
														<FormControl>
															<Input
																placeholder="Rate"
																value={
																	field.value ? formatNumber(field.value) : ""
																}
																onChange={(e) => {
																	const parsed = parseNumber(e.target.value);
																	form.setValue(
																		`items.${index}.rate`,
																		isNaN(parsed) ? 0 : parsed
																	);
																}}
																inputMode="numeric"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											{/* Remove Button */}
											<button
												type="button"
												onClick={() => remove(index)}
												className="text-red-500 text-xs h-fit px-3 py-2 border border-red-500 rounded hover:bg-red-50 mt-6"
											>
												<Trash className="size-4" />
											</button>
										</div>
									</div>
								))}

								<div className="flex flex-col w-fit my-4">
									<Button
										type="button"
										onClick={() => append({ item: "", quantity: "", rate: 0 })}
									>
										Add Item
									</Button>
								</div>
							</TabsContent>
							<TabsContent value="address">
								<div className="mb-5">
									<FormField
										control={form.control}
										name="isProforma"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Invoice Type</FormLabel>
												<FormControl>
													<div className="flex items-center space-x-2">
														<Switch
															id="proforma"
															checked={check}
															onCheckedChange={handleSwitchChange}
															{...field}
														/>
														<Label htmlFor="proforma">
															{check ? "Proforma" : "Invoice"}
														</Label>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{!check && (
									<div className="block  w-full my-4">
										<FormField
											control={form.control}
											name="subject"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Subject</FormLabel>
													<FormControl>
														<Input placeholder="subject" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								)}
								<div className="flex flex-wrap justify-between w-full my-4">
									<div className="w-full md:w-1/2 md:pr-5 mb-5 md:mb-0">
										<FormField
											control={form.control}
											name="invoiceDate"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel>Invoice Date</FormLabel>
													<Popover open={dateOpen} onOpenChange={setDateOpen}>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant="outline"
																	onClick={() => setDateOpen((prev) => !prev)}
																	className={cn(
																		"w-full pl-3 text-left font-normal",
																		!field.value && "text-muted-foreground"
																	)}
																>
																	{field.value ? (
																		`${field.value.toDateString()} ${field.value.toLocaleTimeString()}`
																	) : (
																		<span>Pick a date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start"
														>
															<Calendar
																mode="single"
																selected={field.value}
																onSelect={(date) => {
																	field.onChange(date);
																	setDateOpen(false); // Close the popover on date select
																}}
																disabled={(date) =>
																	date < new Date("1900-01-01")
																}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									{check && (
										<div className="w-full md:w-1/2 md:pr-5 mb-5 md:mb-0">
											<FormField
												control={form.control}
												name="dueDate"
												render={({ field }) => (
													<FormItem className="flex flex-col">
														<FormLabel>Due Date</FormLabel>
														<Popover
															open={dueDateOpen}
															onOpenChange={setDueDateOpen}
														>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant="outline"
																		onClick={() =>
																			setDueDateOpen((prev) => !prev)
																		}
																		className={cn(
																			"w-full pl-3 text-left font-normal",
																			!field.value && "text-muted-foreground"
																		)}
																	>
																		{field.value ? (
																			`${field.value.toDateString()} ${field.value.toLocaleTimeString()}`
																		) : (
																			<span>Pick a date</span>
																		)}
																		<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent
																className="w-auto p-0"
																align="start"
															>
																<Calendar
																	mode="single"
																	selected={field.value}
																	onSelect={(date) => {
																		field.onChange(date);
																		setDueDateOpen(false); // Close on date select
																	}}
																	disabled={(date) =>
																		date < new Date("1900-01-01")
																	}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									)}
								</div>
								<div className="w-full my-2">
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input placeholder="City" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-full">
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address</FormLabel>
												<FormControl>
													<Textarea placeholder="Address" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</TabsContent>
						</Tabs>
						<Button type="submit" variant={"brand"}>
							Save
						</Button>
					</form>
				</Form>
			</div>
			<div className="w-full md:w-1/2 md:pr-5 mb-5 md:mb-0">
				<h4>Preview</h4>
				<Button onClick={handleDownloadPDF} className="mt-4">
					Print Invoice
				</Button>

				{/* Make sure the ref is properly passed to PrintableComponent */}
				<PrintableComponent
					invoiceData={invoiceData}
					items={items}
					ref={componentRef}
					isProforma={check}
				/>
			</div>
		</div>
	);
};

export default InvoiceForm;
