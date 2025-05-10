"use client";
import { Checkbox } from "@/components/ui/checkbox";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, conditionTypes, productTypes } from "@/lib/constants";
import { ProductSchema, ProductSchemaInfer } from "@/lib/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/loading-button";
import { useToast } from "../ui/use-toast";
import { ProductWithExtras } from "@/types";
import { useEffect } from "react";
import BackButton from "../common/back-button";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
	product?: ProductWithExtras | null | undefined;
};

const ProductForm = ({ product }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	let buttonText: string;
	let toastText: string;
	let updating: boolean;

	if (product) {
		buttonText = "Update Product";
		toastText = "Product Updated successfully";
		updating = true;
	} else {
		buttonText = "Create Product";
		toastText = "Product Created successfully";
		updating = false;
	}

	const form = useForm({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			title: "",
			description: "",
			category: "",
			productType: "",
			currentStock: 0,
			minimumStock: 0,
			manufacturer: "",
			model: "",
			year: "",
			condition: "",
			hours: 0,
			specifications: "",
			isBucket: false,
			isExterior: false,
			isRops: false,
			isUpdate: updating,
		},
	});

	useEffect(() => {
		if (product) {
			form.setValue("title", product?.title!);
			form.setValue("description", product?.description!);
			form.setValue("category", product?.category!);
			form.setValue("productType", product?.productType!);
			form.setValue("currentStock", product?.currentStock!);
			form.setValue("minimumStock", product?.minimumStock!);
			form.setValue("manufacturer", product?.manufacturer!);
			form.setValue("model", product?.model!);
			form.setValue("year", product?.year!);
			form.setValue("condition", product?.condition!);
			form.setValue("hours", Number(product?.hours!));
			form.setValue("specifications", String(product?.specifications!));
			form.setValue("isBucket", product?.isBucket!);
			form.setValue("isExterior", product?.isExterior!);
			form.setValue("isRops", product?.isRops!);
		}
	}, [product]);

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			title,
			description,
			category,
			productType,
			currentStock,
			minimumStock,
			manufacturer,
			model,
			year,
			condition,
			hours,
			specifications,
			isBucket,
			isExterior,
			isRops,
			isUpdate,
			idUpdate,
		}: ProductSchemaInfer) => {
			const payload: ProductSchemaInfer = {
				title,
				description,
				category,
				productType,
				currentStock,
				minimumStock,
				manufacturer,
				model,
				year,
				condition,
				hours,
				specifications,
				isBucket,
				isExterior,
				isRops,
				isUpdate,
				idUpdate,
			};
			const { data } = isUpdate
				? await axios.patch("/api/product/", payload)
				: await axios.post("/api/product/", payload);
			return data;
		},
		onSuccess: (data) => {
			if (product) {
				router.push(`/dashboard/inventories/product/`);
			} else {
				router.push(
					`/dashboard/inventories/product/${data.payload.slug}/upload`
				);
			}
			form.reset();
			return toast({
				description: toastText,
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

	const onProductSubmit = async (values: ProductSchemaInfer) => {
		if (product) {
			mutate({
				idUpdate: product.id!,
				isUpdate: true,
				title: values.title || product.title!,
				description: values.description || product.description!,
				category: values.category || product.category!,
				productType: values.productType || product.productType!,
				currentStock: values.currentStock || product.currentStock!,
				minimumStock: values.minimumStock || product.minimumStock!,
				manufacturer: values.manufacturer || product.manufacturer!,
				model: values.model || product.model!,
				year: values.year || product.year!,
				condition: values.condition || product.condition!,
				hours: Number(values.hours || product.hours!),
				specifications:
					values.specifications || String(product.specifications!),
				isBucket: values.isBucket || product.isBucket!,
				isExterior: values.isExterior || product.isExterior!,
				isRops: values.isRops || product.isRops!,
			});
		} else {
			mutate(values);
		}
	};

	const onFormError: SubmitErrorHandler<ProductSchemaInfer> = (e: any) => {
		console.log(e);
	};

	return (
		<div className="flex items-start flex-col  w-full justify-start p-5">
			<div className="flex justify-between flex-wrap my-5">
				<BackButton />
				{product && (
					<Button variant="brand" asChild>
						<Link
							href={`/dashboard/inventories/product/${product.slug}/upload`}
						>
							Upload images
						</Link>
					</Button>
				)}
			</div>
			<h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-2xl">
				{buttonText}
			</h2>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onProductSubmit, onFormError)}
					className="space-y-5  w-full"
				>
					<div className="w-full space-x-2">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Product Name</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Product Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-wrap justify-between w-full">
						<div className="w-full md:w-1/3  md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="productType"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Product Type
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Type" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(productTypes).map((type) => (
														<SelectItem
															key={type}
															value={type}
															className="capitalize"
														>
															{type.toLowerCase()}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/3  md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Category</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Type" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(categories).map((type) => (
														<SelectItem
															key={type}
															value={type}
															className="capitalize"
														>
															{type.toLowerCase()}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/3  md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="condition"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Condition</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Condition" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(conditionTypes).map((type) => (
														<SelectItem
															key={type}
															value={type}
															className="capitalize"
														>
															{type.toLowerCase()}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="flex flex-wrap justify-between w-full ">
						<div className="w-full md:w-1/3 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="currentStock"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Current Stock
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Current Stock"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/3 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="minimumStock"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Minimum Stock
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Minimum Stock"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/3 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="year"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Year</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Year" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="flex flex-wrap justify-between w-full ">
						<div className=" md:w-1/3 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="manufacturer"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Manufacturer
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="manufacturer"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className=" md:w-1/3 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Model</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Model" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="md:w-1/3 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="hours"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Hours</FormLabel>
										<FormControl>
											<Input type="text" placeholder="hour" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="description..."
											id="description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="specifications"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Specifications
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="specifications..."
											id="specifications"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-wrap justify-between w-full ">
						<div className="w-1/3">
							<FormField
								control={form.control}
								name="isBucket"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="font-semibold">Bucket</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/3">
							<FormField
								control={form.control}
								name="isRops"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="font-semibold">Rops</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/3">
							<FormField
								control={form.control}
								name="isExterior"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="font-semibold whitespace-nowrap">
											Has Exterior
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<LoadingButton
						type="submit"
						loading={isPending}
						className="mt-6 w-full"
					>
						{buttonText}
					</LoadingButton>
				</form>
			</Form>
		</div>
	);
};

export default ProductForm;
