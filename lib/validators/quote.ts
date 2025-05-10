import * as z from "zod";

export const QuoteSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email().min(1, { message: "Email is required" }),
	message: z.string().min(1, { message: "Message is required" }),
	productId: z.string().optional(),
});

export type QuoteSchemaInfer = z.infer<typeof QuoteSchema>;
