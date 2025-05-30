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
import {
	ImageSchemaInfer,
	PartSchema,
	PartSchemaInfer,
	ProductSchema,
	ProductSchemaInfer,
} from "@/lib/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/loading-button";
import { useToast } from "../ui/use-toast";
import { ProductWithExtras } from "@/types";
import { useEffect, useState } from "react";
import BackButton from "../common/back-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { compressImage, upscaleImageBrowser } from "@/lib/utils";
import { ImageIcon, XIcon } from "lucide-react";
import { Label } from "../ui/label";
import Image from "next/image";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxFileSize = 10 * 1024 * 1024; // 10MB
type Props = {
	product?: ProductWithExtras | null | undefined;
};

const PartForm = ({ product }: Props) => {
	const router = useRouter();
	const { toast } = useToast();
	const [priceValue, setPriceValue] = useState<string>("0");
	const [images, setImages] = useState<ImageSchemaInfer[]>([]);

	const onDrop = (acceptedFiles: File[]) => {
		// @ts-ignore
		const newImages: ImageSchemaInfer[] = acceptedFiles.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
		}));

		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const {
		getRootProps: getRootProps,
		getInputProps: getInputProps,
		isDragActive: isDragActive,
	} = useDropzone({
		onDrop,
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
			"image/webp": [".webp"],
		},
		maxSize: 10 * 1024 * 1024, // 10MB
	});

	const removeImage = (index: number) => {
		setImages((prevImages) => {
			const updatedImages = [...prevImages];
			updatedImages.splice(index, 1);
			return updatedImages;
		});
	};

	let buttonText: string;
	let toastText: string;
	let updating: boolean;

	if (product) {
		buttonText = "Update Part";
		toastText = "Part Updated successfully";
		updating = true;
	} else {
		buttonText = "Create Part";
		toastText = "Part Created successfully";
		updating = false;
	}

	const form = useForm({
		resolver: zodResolver(PartSchema),
		defaultValues: {
			title: "",
			description: "",
			price: "0",
			condition: "",
			productType: "",
			currentStock: 0,
			minimumStock: 0,
			manufacturer: "",

			isUpdate: updating,
		},
	});

	useEffect(() => {
		if (product) {
			form.setValue("title", product?.title!);
			form.setValue("description", product?.description!);
			form.setValue("price", product?.price.toString());
			form.setValue("condition", product?.condition!);
			form.setValue("productType", product?.productType!);
			form.setValue("currentStock", product?.currentStock!);
			form.setValue("minimumStock", product?.minimumStock!);
			form.setValue("manufacturer", product?.manufacturer!);
		}
	}, [product, form]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			const { data } = product
				? await axios.patch(`/api/product/part`, formData)
				: await axios.post(`/api/product/part`, formData);
			return data;
		},
		onSuccess: (data) => {
			if (data && data.status === "success") {
				router.push(`/dashboard/inventories/product`);
				form.reset();
				return toast({
					description: `${toastText}`,
				});
			} else {
				console.error("Unexpected response structure:", data);
				window.location.reload();
				return toast({
					description: "Unexpected response from server",
					variant: "destructive",
				});
			}
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

	const onProductSubmit = async (values: PartSchemaInfer) => {
		if (!images.length) {
			return toast({
				description: `Please select an image`,
				variant: "destructive",
			});
		}
		const formData = new FormData();
		formData.append("idUpdate", product?.id!);
		formData.append("slug", product?.slug || "");
		formData.append("title", values.title);
		formData.append("price", values.price);
		formData.append("condition", values.condition);
		formData.append("productType", values.productType);
		formData.append("manufacturer", values.manufacturer);
		formData.append("currentStock", values.currentStock.toString());
		formData.append("minimumStock", values.minimumStock.toString());
		formData.append("description", values.description!);

		const maxSize = 2 * 1024 * 1024;
		const minSize = 100 * 1024;

		const processedImages = await Promise.all(
			images.map(async (image) => {
				let file = image.file;
				if (file.size < minSize && typeof window !== "undefined") {
					file = await upscaleImageBrowser(file);
				}
				// Compress large images
				else if (file.size > maxSize) {
					file = (await compressImage(file)) as File;
				}

				return file;
			})
		);

		processedImages.forEach((file) => {
			formData.append("images", file);
		});

		mutate(formData);
	};

	const onFormError: SubmitErrorHandler<PartSchemaInfer> = (e: any) => {
		console.log(e);
	};

	const formatNumberWithCommas = (value: string) => {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const handlePriceChange = (event: any) => {
		const value = event.target.value;
		const numericValue = value.replace(/[^0-9.]/g, "");
		const formattedValue = formatNumberWithCommas(numericValue);
		setPriceValue(formattedValue);
		form.setValue("price", numericValue);
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
									<FormLabel className="font-semibold">Part Name</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Part Name" {...field} />
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

						<div className="w-full md:w-1/2  md:pr-5 mb-5 md:mb-0">
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
						<div className="w-full md:w-1/2 md:pr-5 mb-5 md:mb-0">
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
						<div className="w-full md:w-1/2 md:pr-5 mb-5 md:mb-0">
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
					</div>
					<div className="flex flex-wrap justify-between w-full ">
						<div className=" md:w-1/2 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="manufacturer"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Brand(Manufacturer)
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
						<div className=" md:w-1/2 md:pr-5 mb-5 md:mb-0">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Price</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="0.00"
												{...field}
												value={priceValue}
												onChange={handlePriceChange}
												inputMode="numeric"
											/>
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
					<div className="flex flex-col">
						<Label className="uppercase text-xs font-bold text-zinc-500 mb-4">
							Part Images
						</Label>
						<div
							{...getRootProps()}
							className={`border-2 border-dashed rounded-lg p-4 ${
								isDragActive ? "border-blue-500" : "border-gray-300"
							}`}
						>
							<input {...getInputProps()} />
							{isDragActive ? (
								<p>Drop the files here ...</p>
							) : (
								<div className="flex items-start justify-start">
									<div>
										<ImageIcon className="w-10 h-10" />
									</div>
									<div className="ml-4">
										<p className="text-sm m-0">
											{isDragActive
												? "Drop the files here"
												: "Drag and drop files here or click to select"}
										</p>
										<p className="text-xs text-gray-500 mt-1">
											Accepted file types: PNG, JPEG, JPG. Max file size: 10MB.
										</p>
									</div>
								</div>
							)}
							<div className="my-5 flex justify-start gap-4">
								{images.map((image, index) => (
									<div key={index} className="relative flex items-center mt-2">
										<Image
											src={image.preview!}
											alt="Preview"
											height={80}
											width={80}
											className="w-16 h-16 object-cover rounded"
										/>
										<button
											onClick={() => removeImage(index)}
											className="absolute -top-2 -right-1 p-1 bg-red-500 text-white rounded-full"
										>
											<XIcon className="w-4 h-4" />
										</button>
									</div>
								))}
							</div>
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

export default PartForm;
