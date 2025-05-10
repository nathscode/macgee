"use client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Cloud, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ProductWithExtras } from "@/types";
import { deleteUploadImage } from "@/actions/deleteUploadImage";
import BackButton from "../common/back-button";
import { ConfirmModal } from "../modals/confIrmModal";
import { compressImage, upscaleImageBrowser } from "@/lib/utils";

const ImageSchema = z.object({
	file: z.instanceof(File),
	preview: z.string().optional(),
});

type ImageSchemaInfer = z.infer<typeof ImageSchema>;

const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4"];
const maxFileSize = 10 * 1024 * 1024; // 10MB

type Props = {
	slug: string;
	product: ProductWithExtras;
};

const ProductUploadForm = ({ slug, product }: Props) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isPending, startTransition] = useTransition();
	const [images, setImages] = useState<ImageSchemaInfer[]>([]);
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const onDrop = (acceptedFiles: File[]) => {
		// @ts-ignore
		const newImages: ImageSchemaInfer[] = acceptedFiles.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
		}));

		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const removeImage = (index: number) => {
		setImages((prevImages) => {
			const updatedImages = [...prevImages];
			updatedImages.splice(index, 1);
			return updatedImages;
		});
	};
	const removeUploadedImages = (url: string) => {
		startTransition(async () => {
			const result = await deleteUploadImage({
				slug: product?.slug!,
				url: url,
			});
			router.refresh();
			toast({ title: `${result.message}` });
		});
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		// @ts-ignore
		accept: acceptedFileTypes.join(","),
		maxSize: maxFileSize,
		onProgress: (event: any) => {
			const progress = Math.round((event.loaded * 100) / event.total);
			setUploadProgress(progress);
		},
	});

	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: async (FormData: FormData) => {
			const { data } = await axios.patch("/api/product/upload", FormData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return data;
		},
		onSuccess: (data) => {
			router.push(`/product/${data.slug}`);
			return toast({
				description: "Upload successful",
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

	const OnSubmit = async () => {
		const formData = new FormData();
		const maxSize = 2 * 1024 * 1024; // 2MB
		const minSize = 100 * 1024; // 100KB

		const processedImages = await Promise.all(
			images.map(async (image) => {
				let file = image.file;

				// Upscale small images (browser version)
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

		formData.append("slug", slug);
		mutate(formData);
	};
	return (
		<div className="flex justify-center items-center flex-col w-full py-24">
			<div className="flex flex-col items-center justify-center w-full max-w-4xl">
				<div className="container">
					<div className="flex justify-start flex-col w-full">
						<div className="flex justify-start gap-y-4 flex-col md:flex-row w-full">
							<div className="flex flex-col flex-1 shadow-sm rounded-lg px-5 py-8 border bg-white w-full">
								<div className="flex justify-between flex-wrap my-5">
									<BackButton />
								</div>
								<h2 className="text-2xl mb-10 font-semibold leading-tight text-foreground sm:text-2xl">
									Upload Photo of the product
								</h2>
								<div
									{...getRootProps()}
									className={`border-2 border-dashed rounded-lg p-4 ${
										isDragActive ? "border-blue-500" : "border-gray-300"
									}`}
								>
									<input {...getInputProps()} />
									<div className="flex flex-col items-center justify-center">
										<span>
											<Cloud className="w-10 h-10" />
										</span>
										<p className="text-center">
											{isDragActive
												? "Drop the files here"
												: "Drag and drop files here or click to select"}
										</p>
										<p className="text-sm text-gray-500 mt-1">
											Accepted file types: PNG, JPEG, JPG, MP4. Max file size:
											10MB.
										</p>
									</div>
								</div>
								{images.length === 0
									? product.medias && (
											<div className="my-5 flex justify-start gap-4">
												{product.medias.map((image, index) => (
													<div
														key={index}
														className="relative flex items-center mt-2"
													>
														<Image
															src={image?.url!}
															alt="Preview"
															height={80}
															width={80}
															className="w-16 h-16 object-cover rounded"
														/>

														<ConfirmModal
															description="You're about to remove this product image"
															onConfirm={() =>
																removeUploadedImages(image?.url!)
															}
														>
															<button
																disabled={isPending}
																className="absolute -top-2 -right-1 p-1 bg-red-500 text-white rounded-full"
															>
																<XIcon className="w-4 h-4" />
															</button>
														</ConfirmModal>
													</div>
												))}
											</div>
									  )
									: null}
								<div className="my-5 flex justify-start gap-4">
									{images.map((image, index) => (
										<div
											key={index}
											className="relative flex items-center mt-2"
										>
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

								<Button disabled={isLoading ? true : false} onClick={OnSubmit}>
									{isLoading ? "Processing.." : "Upload"}
								</Button>

								{uploadProgress > 0 && (
									<div className="mt-4">
										<div className="bg-gray-200 h-2 rounded">
											<div
												className="bg-blue-500 h-2 rounded"
												style={{
													width: `${uploadProgress}%`,
												}}
											></div>
										</div>
										<p className="text-sm text-gray-500 mt-1">
											{uploadProgress}% uploaded
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductUploadForm;
