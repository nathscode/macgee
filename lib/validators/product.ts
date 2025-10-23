import * as z from "zod";

export const ProductSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	description: z
		.string()
		.optional()
		.transform((v) => v || undefined),
	category: z.string().min(1, { message: "category is required" }),
	productType: z.string().min(1, { message: "product Type is required" }),
	currentStock: z.coerce
		.number()
		.min(1, { message: "current stock is required" }),
	minimumStock: z.coerce
		.number()
		.min(1, { message: "minimum stock is required" }),
	manufacturer: z.string().min(1, { message: "manufacturer is required" }),
	model: z.string().min(1, { message: "model is required" }),
	year: z.string().min(1, { message: "year is required" }),
	condition: z.string().min(1, { message: "condition is required" }),
	hours: z
		.string()
		.optional()
		.transform((v) => v || undefined),
	engineNumber: z
		.string()
		.optional()
		.transform((v) => v || undefined),
	specifications: z
		.string()
		.optional()
		.transform((v) => v || undefined),
	isBucket: z.boolean().default(false),
	isExterior: z.boolean().default(false),
	isRops: z.boolean().default(false),
	isUpdate: z.boolean(),
	idUpdate: z.string().optional(),
});

export type ProductSchemaInfer = z.infer<typeof ProductSchema>;

export const UploadEditSchema = z.object({
	slug: z.string(),
	url: z.string(),
});
export type UploadEditSchemaInfer = z.infer<typeof UploadEditSchema>;

export const PartSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	description: z.string().optional(),
	productType: z.string().min(1, { message: "product Type is required" }),
	price: z.string().min(1, {
		message: "Price must be a valid number",
	}),
	condition: z.string().min(1, { message: "condition is required" }),
	currentStock: z.coerce
		.number()
		.min(1, { message: "current stock is required" }),
	minimumStock: z.coerce
		.number()
		.min(1, { message: "minimum stock is required" }),
	manufacturer: z.string().min(1, { message: "manufacturer is required" }),
	isUpdate: z.boolean(),
	idUpdate: z.string().optional(),
});

export type PartSchemaInfer = z.infer<typeof PartSchema>;

export const ImageSchema = z.object({
	file: z.instanceof(File),
	preview: z.string().optional(),
});

export type ImageSchemaInfer = z.infer<typeof ImageSchema>;
