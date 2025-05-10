"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { HiPlus } from "react-icons/hi2";
import CustomerForm from "../forms/customer-form";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";

type Props = {};

const AddCustomerModal = (props: Props) => {
	const { isOpen, onClose } = useModal();
	return (
		<Dialog onOpenChange={() => onClose()}>
			<DialogTrigger asChild>
				<Button variant="brand" className={"inline-flex items-center"}>
					<HiPlus className="w-5 h-5 mr-2 !text-white" /> Add Customer
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white text-black p-0 overflow-hidden max-w-2xl">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-left font-bold mb-0">
						Add Customer
					</DialogTitle>
					<DialogDescription className="text-left text-zinc-500">
						Make sure you provide the accurate information.
					</DialogDescription>
				</DialogHeader>
				<CustomerForm />
			</DialogContent>
		</Dialog>
	);
};

export default AddCustomerModal;
