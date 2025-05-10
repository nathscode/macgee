import { db } from "@/config/db.config";
import {
	handlerNativeResponse,
	normalizeEmail,
	trimAndLowercase,
} from "@/lib/backend/utils";
import { generateRandomString } from "@/lib/utils";
import { QuoteSchema, QuoteSchemaInfer } from "@/lib/validators/quote";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import QuoteTemp from "@/components/email/quote-temp";
import { site } from "@/lib/site";
import { sendEmail } from "@/lib/mail";
import { getLogger } from "@/lib/backend/logger";

const logger = getLogger();

export async function POST(req: Request) {
	try {
		// Validate request body
		const body: QuoteSchemaInfer = await req.json();
		const validatedData = QuoteSchema.safeParse(body);

		if (!validatedData.success) {
			logger.warn("Validation failed", { errors: validatedData.error });
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: "Invalid request data",
						details: validatedData.error.flatten(),
					},
				},
				400
			);
		}

		const { name, email, message, productId } = validatedData.data;
		if (!productId) {
			logger.warn("Product ID is required");
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: "Product ID is required",
					},
				},
				400
			);
		}

		// Check product existence
		const productExist = await db.product.findFirst({
			where: { id: productId },
			select: {
				id: true,
				title: true,
				productType: true,
				year: true,
				model: true,
				category: true,
				manufacturer: true,
			},
		});

		if (!productExist) {
			logger.warn("Product not found", { productId });
			return handlerNativeResponse(
				{
					status: 404,
					errors: {
						message: "Product not found",
					},
				},
				404
			);
		}

		// Format inputs
		const formattedName = trimAndLowercase(name);
		const formattedEmail = normalizeEmail(email);
		const referenceCode = generateRandomString(8);
		const quoteObj = await db.$transaction(async (tx) => {
			const quote = await tx.quote.create({
				data: {
					productId: productExist.id,
					name: formattedName,
					email: formattedEmail,
					message,
					referenceCode,
				},
			});
			return quote;
		});
		if (!quoteObj) {
			return handlerNativeResponse(
				{ status: 400, message: "Error submitting Order, try again" },
				400
			);
		}
		try {
			const productDetails =
				productExist.productType === "TRUCK"
					? `${productExist.title} ${productExist.year} ${productExist.model} ${productExist.category}`
					: `${productExist.title}-${productExist.manufacturer}`;

			const htmlEmail = await render(
				QuoteTemp({
					name: formattedName,
					email: formattedEmail,
					message: message || "No message provided",
					productDetails,
				})
			);

			const emailPayload = {
				from: {
					email: `macgeeequipments@gmail.com`,
					name: `${site.name} <no-reply@${site.domain}>`,
				},
				subject: `New Quotation for [${productExist.title}]`,
				html: htmlEmail,
				params: {
					orderId: quoteObj.id,
					customerName: site.name,
				},
			};
			await sendEmail({
				...emailPayload,
				to: site.email,
				subject: `New Quotation for [${productExist.title}]`,
			});
		} catch (emailError) {
			logger.error("Email sending failed", { error: emailError });
		}

		return NextResponse.json({
			status: true,
			message: "Quotation request sent successfully",
			data: {
				referenceCode: "ref",
			},
		});
	} catch (error: any) {
		logger.error("Quote creation failed", { error });

		// Handle known error cases
		if (error.code === "P2000" && error.message.includes("too long")) {
			return handlerNativeResponse(
				{
					status: 400,
					message: "Reference code too long",
				},
				400
			);
		}

		return handlerNativeResponse(
			{
				status: 500,
				message: "Internal server error",
			},
			500
		);
	}
}
