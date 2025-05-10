import { z } from "zod";

export const InvoiceSchema = z.object({
	items: z
		.array(
			z.object({
				item: z.string().min(1),
				quantity: z.string().min(1),
				rate: z.coerce.number(),
			})
		)
		.min(1),
	name: z.string().min(1, { message: "Name is required" }),
	subject: z.string().min(1, { message: "subject is required" }),
	dueDate: z.date({
		required_error: "A date  is required.",
	}),
	invoiceDate: z.date({
		required_error: "A date  is required.",
	}),
	invoiceNumber: z.string().optional(),
	address: z.string().min(1),
	city: z.string().min(1),
});

export type InvoiceSchemaInfer = z.infer<typeof InvoiceSchema>;
