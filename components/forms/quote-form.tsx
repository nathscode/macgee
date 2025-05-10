"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import { QuoteSchema, QuoteSchemaInfer } from "@/lib/validators/quote";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/loading-button";
import { useToast } from "../ui/use-toast";

type Props = {
	productId: string;
};

const QuoteForm = ({ productId }: Props) => {
	const { onClose } = useModal();
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(QuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
			productId: productId,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			name,
			email,
			message,
			productId,
		}: QuoteSchemaInfer) => {
			const payload: QuoteSchemaInfer = {
				name,
				email,
				message,
				productId,
			};
			const { data } = await axios.post("/api/get-quote/", payload);
			return data;
		},
		onSuccess: () => {
			form.reset();
			onClose();
			window.location.reload();
			return toast({
				description: "Quotation Sent Successfully",
			});
		},
		onError: (err: any) => {
			const errorMessage =
				err.response?.data?.errors?.message || "Server error";
			return toast({
				description: `An error occurred ${errorMessage}`,
				variant: "destructive",
			});
		},
	});

	const onQuoteSubmit = async (values: QuoteSchemaInfer) => {
		mutate(values);
	};
	const onFormError: SubmitErrorHandler<QuoteSchemaInfer> = (e: any) => {
		console.log(e);
	};
	return (
		<div className="flex items-start flex-col  w-full justify-start p-5">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onQuoteSubmit, onFormError)}
					className="space-y-5  w-full"
				>
					<div className="flex justify-between flex-col space-y-2 md:flex-row w-full md:space-x-2 md:space-y-0">
						<div className="w-full md:w-1/2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Customer Name
										</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Customer Email
										</FormLabel>
										<FormControl>
											<Input type="email" placeholder="Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="w-full space-x-2">
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Message</FormLabel>
									<FormControl>
										<Textarea placeholder="Message" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-col pt-4">
						<LoadingButton
							type="submit"
							loading={isPending}
							variant={"brand"}
							className=" w-full"
						>
							Submit
						</LoadingButton>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default QuoteForm;
