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
import { CustomerSchema, CustomerSchemaInfer } from "@/lib/validators/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/loading-button";
import { useToast } from "../ui/use-toast";
import { useModal } from "@/hooks/use-modal";

type Props = {};

const CustomerForm = (props: Props) => {
	const { onClose } = useModal();
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(CustomerSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			businessName: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			name,
			email,
			phone,
			address,
			businessName,
		}: CustomerSchemaInfer) => {
			const payload: CustomerSchemaInfer = {
				name,
				email,
				phone,
				address,
				businessName,
			};
			const { data } = await axios.post("/api/customer/", payload);
			return data;
		},
		onSuccess: () => {
			router.push(`/dashboard/pos/checkout`);
			form.reset();
			onClose();
			return toast({
				description: "Customer created",
			});
		},
		onError: (err: any) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 400) {
					return toast({
						title: "Invalid credentials.",
						description: `${err.response.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				if (err.response?.data?.status === 401) {
					return toast({
						title: "An error occurred.",
						description: `${err.response?.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				if (err.response?.data?.status === 403) {
					return toast({
						title: "An error occurred.",
						description: `${err.response?.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				if (err.response?.data?.status === 409) {
					return toast({
						title: "An error occurred.",
						description: `${err.response?.data?.errors?.message}`,
						variant: "destructive",
					});
				}

				toast({
					title: "There was an error",
					description: `${err.message}`,
					variant: "destructive",
				});
			}
		},
	});

	const onCustomerSubmit = async (values: CustomerSchemaInfer) => {
		mutate(values);
	};
	const onFormError: SubmitErrorHandler<CustomerSchemaInfer> = (e: any) => {
		console.log(e);
	};
	return (
		<div className="flex items-start flex-col  w-full justify-start p-5">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onCustomerSubmit, onFormError)}
					className="space-y-5  w-full"
				>
					<div className="w-full space-x-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Customer Name</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full space-x-2">
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

					<div className="flex flex-wrap justify-between w-full">
						<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Mobile Number
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Mobile Number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="businessName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Business Name
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Business Name"
												{...field}
											/>
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
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Business Address
									</FormLabel>
									<FormControl>
										<Textarea placeholder="Address" {...field} />
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

export default CustomerForm;
