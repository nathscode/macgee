"use client";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useCartStore from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { SafeCustomer } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type Props = {
	customers: SafeCustomer[];
};

const CustomerSelectForm = ({ customers }: Props) => {
	const { setCustomerId, customerId } = useCartStore();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<SafeCustomer>(customers[0]);
	const router = useRouter();
	const { toast } = useToast();

	function handleCustomerId(id: string) {
		const result = setCustomerId(id);
		return toast({
			description: (
				<div className="inline-flex justify-start">
					{/* @ts-ignore */}
					<span>{result.description}</span>
				</div>
			),
		});
	}

	function toNextConfirmPage() {
		if (customerId) {
			router.push("/dashboard/pos/checkout/confirm");
		} else {
			return toast({
				description: "Select or add a customer to proceed",
			});
		}
	}

	return (
		<div className="flex items-start flex-col w-full justify-start">
			<div className="w-full">
				<h4 className="font-semibold text-base mb-2">Select Customer</h4>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-full justify-between"
						>
							{selected
								? customers.find((customer) => customer.id === selected.id)
										?.name
								: "Select customer..."}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Search Customers..." />
							<CommandList>
								<CommandEmpty>No Customer found.</CommandEmpty>
								<CommandGroup>
									{customers.map((customer) => (
										<CommandItem
											key={customer.id}
											value={customer.email!}
											onSelect={(currentValue) => {
												const selectedCustomer = customers.find(
													(cat) => cat.email!.toLowerCase() === currentValue
												);
												if (selectedCustomer) {
													setSelected(selectedCustomer);
													handleCustomerId(customer.id);
												}

												setOpen(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													selected.id === customer.id
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											<span className="capitalize">{customer.name}</span>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<div className="flex flex-col my-5">
					<Button variant={"brand"} onClick={() => toNextConfirmPage()}>
						Proceed
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CustomerSelectForm;
