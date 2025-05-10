"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import QuoteForm from "../forms/quote-form";

type Props = {
	isOpen: boolean;
	handleClose: () => void;
	product: string;
	productId: string;
};

const QuoteModal = ({ isOpen, handleClose, product, productId }: Props) => {
	return (
		<Dialog open={isOpen} onOpenChange={() => handleClose()}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden max-w-2xl">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-left font-bold mb-0">
						Get Quote
					</DialogTitle>
					<DialogDescription className="text-left text-zinc-500">
						Your quote will be accessed in a very short time, and you'll get a
						reply in your email.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col w-full px-4">
					<h4 className="font-semibold text-lg">Product details: {product}</h4>
				</div>
				<QuoteForm productId={productId} />
			</DialogContent>
		</Dialog>
	);
};

export default QuoteModal;
