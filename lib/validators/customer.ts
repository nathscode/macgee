import * as z from "zod";

export const CustomerSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email().min(1, { message: "Email is required" }),
	phone: z.string().min(1, { message: "phone is required" }),
	businessName: z.string().min(1, { message: "business name is required" }),
	address: z.string().min(1, { message: "address is required" }),
});

export type CustomerSchemaInfer = z.infer<typeof CustomerSchema>;

export const CustomerSelectSchema = z.object({
	email: z.string().min(1, { message: "Please select a customer" }),
});

export type CustomerSelectSchemaInfer = z.infer<typeof CustomerSelectSchema>;
