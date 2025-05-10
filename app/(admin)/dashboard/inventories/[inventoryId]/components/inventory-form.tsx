"use client";
import { AlertModal } from "@/components/AlertModal";
import Container from "@/components/Container";
import { Heading } from "@/components/Heading";
import Button from "@/components/ui/Button";
import { db, storage } from "@/firebase/clientApp";
import useDeleteDirectory from "@/hooks/useFirebaseStorage";
import { useAppSelector } from "@/lib/store/hooks";
import { selectUser } from "@/lib/store/reducers/userReducer";
import { Product } from "@/types";
import { getRandomId } from "@/utils/random";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";
import * as z from "zod";

const formSchema = z.object({
	name: z.string().min(4, { message: "Firstname is required" }),
	description: z
		.string()
		.min(1, { message: "Description is required" })
		.optional()
		.or(z.literal("")),
	category: z.string().min(4, { message: "category is required" }),
	year: z.string().min(1, { message: "year is required" }),
	manufacturer: z.string().min(1, { message: "Manufacture is required" }),
	model: z.string().min(1, { message: "Model is required" }),
	condition: z.string().min(1, { message: "Condition is required" }),
	serialNumber: z
		.string()
		.min(1, { message: "Serial Number is required" })
		.optional()
		.or(z.literal("")),
	hours: z
		.string()
		.min(1, { message: "Hours is required" })
		.optional()
		.or(z.literal("")),
	bucket: z.boolean().default(false).optional(),
	exterior: z.boolean().default(false).optional(),
	rops: z.boolean().default(false).optional(),
});

type InventoryFormValues = z.infer<typeof formSchema>;

interface InventoryFormProps {
	initialData: Product | null;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
	initialData,
}) => {
	const router = useRouter();
	const user = useAppSelector(selectUser);

	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState(user?.uid || null);
	const [loading, setLoading] = useState(false);
	const [selectedImages, setSelectedImages] = useState([]);

	const title = initialData ? "Edit inventory" : "Create inventory";
	const description = initialData ? "Edit a inventory." : "Add a new inventory";
	const toastMessage = initialData
		? "Inventory updated."
		: "Inventory created.";
	const action = initialData ? "Save changes" : "Create";

	const defaultValues = {
		name: "",
		description: "",
		category: "",
		year: "",
		manufacturer: "",
		model: "",
		condition: "",
		serialNumber: "",
		hours: "",
		bucket: false,
		exterior: false,
		rops: false,
		images: [],
	};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<InventoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	useEffect(() => {
		if (initialData) {
			setValue("name", initialData.name);
			setValue("category", initialData.category);
			setValue("description", initialData.description);
			setValue("year", initialData.specifications.year.toString());
			setValue(
				"manufacturer",
				initialData.specifications.manufacturer.toString()
			);
			setValue("model", initialData.specifications.model.toString());
			setValue("condition", initialData.specifications.condition.toString());
			setValue(
				"serialNumber",
				initialData.specifications.serialNumber.toString()
			);
			setValue("hours", initialData.specifications.hours.toString());
		}
	}, [initialData]);

	const onSubmit = async (data: InventoryFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				const updateDocRef = doc(db, "inventory", initialData?.id);
				const updateDocument = await updateDoc(updateDocRef, {
					name: data.name || initialData.name,
					description: data.description || initialData.description,
					category: data.category || initialData.category,
					specifications: {
						year: data.year || initialData.specifications.year,
						manufacturer:
							data.manufacturer || initialData.specifications.manufacturer,
						model: data.model || initialData.specifications.model,
						condition: data.condition || initialData.specifications.condition,
						serialNumber:
							data.serialNumber || initialData.specifications.serialNumber,
						hours: data.hours || initialData.specifications.hours,
						bucket: data.bucket || initialData.specifications.bucket,
						exterior: data.exterior || initialData.specifications.exterior,
						rops: data.rops || initialData.specifications.rops,
					},
				});
			} else {
				const docRef = await addDoc(collection(db, "inventory"), {
					user: userId,
					name: data.name,
					description: data.description || "",
					category: data.category,
					specifications: {
						year: data.year,
						manufacturer: data.manufacturer,
						model: data.model,
						condition: data.condition,
						serialNumber: data.serialNumber || "",
						hours: data.hours || "",
						bucket: data.bucket || false,
						exterior: data.exterior || false,
						rops: data.rops || false,
					},
					timestamp: serverTimestamp(),
				});
				await Promise.all(
					selectedImages.map((image) => {
						// @ts-ignore
						const imageRef = ref(
							storage,
							`inventory/${docRef.id}/${getRandomId()}`
						);
						// @ts-ignore
						uploadBytes(imageRef, image, "data_url").then(async () => {
							const downloadURL = await getDownloadURL(imageRef);
							await updateDoc(doc(db, "inventory", docRef.id), {
								images: arrayUnion(downloadURL),
							});
						});
					})
				);
			}
			router.refresh();
			router.push("/dashboard/inventories");
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};
	const onDelete = async () => {
		//@ts-ignore
		const docId = initialData?.id;

		try {
			//@ts-ignore
			useDeleteDirectory(docId);
			//@ts-ignore
			const docRef = doc(db, "inventory", docId);
			await deleteDoc(docRef);
			router.refresh();
			router.push("/dashboard/inventories");
			toast.success("Inventory deleted");
		} catch (error: any) {
			toast.error("Something went wrong. Maybe network");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	const onDrop = useCallback((acceptedFiles: any) => {
		setSelectedImages(
			acceptedFiles.map((file: any) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });
	const selected_images = selectedImages?.map((file, idx) => (
		<div className="relative flex flex-col p-2 " key={idx}>
			<div className="mb-5">
				<Image
					className="inline-flex rounded-md"
					// @ts-ignore
					src={file.preview}
					height={150}
					width={150}
					alt=""
				/>
			</div>
			<div>
				<button
					className="absolute top-0 right-0 p-2 bg-red-500 rounded-full shadow-lg"
					type="button"
					onClick={() => removeImage(idx)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4 text-white"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>
		</div>
	));

	const removeImage = (id: any) => {
		const updatedFiles = [...selectedImages];
		updatedFiles.splice(id, 1);
		setSelectedImages(updatedFiles);
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				// @ts-ignore
				onConfirm={onDelete}
				loading={loading}
			/>
			<Container>
				<div className="flex items-center justify-between">
					<Heading title={title} description={description} />
					{initialData && (
						// @ts-ignore
						<Button
							type="button"
							variant="danger"
							className="p-2 rounded-md"
							size="sm"
							onClick={() => setOpen(true)}
						>
							<HiTrash className="w-5 h-5" />
						</Button>
					)}
				</div>
				<hr className="shrink-0 bg-gray-100 h-[1px] w-full" />
				<form
					className="w-full max-w-3xl px-8 pt-10 pb-8 mb-4 "
					onSubmit={handleSubmit(onSubmit)}
				>
					{initialData ? null : (
						<div className="w-full p-8 mb-4 bg-gray-200 rounded-lg">
							<label htmlFor="fileInput" className="text-gray-700">
								Choose a file:
							</label>
							<div className="flex items-center mt-2" {...getRootProps()}>
								<input {...getInputProps()} />

								<label
									htmlFor="fileInput"
									className="px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
								>
									Browse
								</label>
							</div>
							<div className="flex flex-wrap justify-start gap-3 my-4">
								{selected_images}
							</div>
						</div>
					)}
					<div className="w-full mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
							id="name"
							type="text"
							placeholder="Name"
							{...register("name")}
							// value={`${initialData ? "" : initialData?.name}`}
						/>
						{errors.name && (
							<p className="mt-2 text-xs italic text-red-500">
								{" "}
								{errors.name?.message}
							</p>
						)}
					</div>
					<div className="w-full mb-4 md:flex md:justify-between">
						<div className="w-full mb-4 md:mr-2 md:mb-0">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="year"
							>
								Year
							</label>
							<input
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								id="year"
								type="text"
								placeholder="Year"
								{...register("year")}
							/>
							{errors.year && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.year?.message}
								</p>
							)}
						</div>
						<div className="w-full md:ml-2">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="category"
							>
								Category
							</label>

							<select
								id="category"
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300  text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								{...register("category")}
							>
								<option selected disabled>
									Choose category
								</option>
								<option value="EXCAVATOR">Excavators</option>
								<option value="DUMPER">Dumper</option>
								<option value="ROLLER">Roller</option>
								<option value="SLEEPER">Sleeper</option>
								<option value="LOADER">Wheel Loaders</option>
							</select>
							{errors.category && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.category?.message}
								</p>
							)}
						</div>
					</div>
					<div className="w-full mb-4 md:flex md:justify-between">
						<div className="w-full mb-4 md:mr-2 md:mb-0">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="model"
							>
								Model
							</label>
							<input
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								id="model"
								type="text"
								placeholder="Model"
								{...register("model")}
							/>
							{errors.model && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.model?.message}
								</p>
							)}
						</div>
						<div className="w-full md:ml-2">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="manufacturer"
							>
								Manufacturer
							</label>

							<select
								id="category"
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300  text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								{...register("manufacturer")}
							>
								<option selected disabled>
									Choose Manufacturers
								</option>
								<option value="BOMAG">Bomag</option>
								<option value="CATERPILLAR">Caterpillar</option>
								<option value="MACK">Mack</option>
								<option value="MITSUBISHI">Mitsubishi</option>
								<option value="VOLVO">Volvo</option>
							</select>
							{errors.manufacturer && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.manufacturer?.message}
								</p>
							)}
						</div>
					</div>
					<div className="w-full mb-4 md:flex md:justify-between">
						<div className="w-full mb-4 md:mr-2 md:mb-0">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="condition"
							>
								Condition
							</label>

							<select
								id="category"
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300  text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								{...register("condition")}
							>
								<option selected disabled>
									Choose condition
								</option>
								<option value="USED">Used</option>
								<option value="NEW">New</option>
							</select>
							{errors.condition && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.condition?.message}
								</p>
							)}
						</div>
						<div className="w-full md:ml-2">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="serialNumber"
							>
								Serial Number
							</label>
							<input
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								id="type"
								type="text"
								placeholder="SerialNumber"
								{...register("serialNumber")}
							/>
							{errors.serialNumber && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.serialNumber?.message}
								</p>
							)}
						</div>
					</div>
					<div className="w-full mb-4 md:flex md:justify-between">
						<div className="w-full mb-4 md:mr-2 md:mb-0">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="hours"
							>
								Hours
							</label>
							<input
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								id="hours"
								type="number"
								placeholder="Hours"
								{...register("hours")}
							/>
							{errors.hours && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.hours?.message}
								</p>
							)}
						</div>
						<div className="w-full md:ml-2">
							<label
								className="block mb-2 text-sm font-bold text-gray-700"
								htmlFor="description"
							>
								Description
							</label>
							<input
								className="rounded-md appearance-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand/50 focus:border-brand/50 focus:z-10 !text-xs"
								id="type"
								type="text"
								placeholder="Description"
								{...register("description")}
							/>
							{errors.description && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.description?.message}
								</p>
							)}
						</div>
					</div>
					<div className="w-full mb-10 md:flex md:justify-between">
						<div className="w-full mb-4 md:mr-2 md:mb-0">
							<div className="flex items-center">
								<input
									id="bucket-checkbox"
									type="checkbox"
									value=""
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-brand focus:ring-brand/50"
									{...register("bucket")}
								/>
								<label
									htmlFor="bucket-checkbox"
									className="ml-2 text-sm font-medium text-gray-900 "
								>
									Bucket
								</label>
							</div>
							{errors.bucket && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.bucket?.message}
								</p>
							)}
						</div>
						<div className="w-full mb-4 md:mr-2 md:mb-0">
							<div className="flex items-center">
								<input
									id="exterior-checkbox"
									type="checkbox"
									value=""
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-brand focus:ring-brand/50"
									{...register("exterior")}
								/>
								<label
									htmlFor="exterior-checkbox"
									className="ml-2 text-sm font-medium text-gray-900 "
								>
									Exterior
								</label>
							</div>
							{errors.exterior && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.exterior?.message}
								</p>
							)}
						</div>
						<div className="w-full md:ml-2">
							<div className="flex items-center">
								<input
									id="rops-checkbox"
									type="checkbox"
									value=""
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-brand focus:ring-brand/50"
									{...register("rops")}
								/>
								<label
									htmlFor="rops-checkbox"
									className="ml-2 text-sm font-medium text-gray-900"
								>
									Rops
								</label>
							</div>
							{errors.rops && (
								<p className="mt-2 text-xs italic text-red-500">
									{" "}
									{errors.rops?.message}
								</p>
							)}
						</div>
					</div>
					{/* @ts-ignore */}
					<Button
						type="submit"
						disabled={loading}
						pill
						className={"inline-flex items-center ml-auto"}
					>
						{action}
					</Button>
				</form>
			</Container>
		</>
	);
};
