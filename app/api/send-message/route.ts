import ContactTemp from "@/components/email/contact-temp";
import { getLogger } from "@/lib/backend/logger";
import {
	handlerNativeResponse,
	normalizeEmail,
	trimAndLowercase,
} from "@/lib/backend/utils";
import { sendEmail } from "@/lib/mail";
import { site } from "@/lib/site";
import { ContactSchema, ContactSchemaInfer } from "@/lib/validators/customer";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
const logger = getLogger();
export async function POST(req: Request) {
	try {
		// Validate request body
		const body: ContactSchemaInfer = await req.json();
		const validatedData = ContactSchema.safeParse(body);

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

		const { fullname, email, message } = validatedData.data;
		try {
			const formattedName = trimAndLowercase(fullname);
			const formattedEmail = normalizeEmail(email);

			const htmlEmail = await render(
				ContactTemp({
					fullname: formattedName,
					email: formattedEmail,
					message: message || "No message provided",
				})
			);

			const emailPayload = {
				from: {
					email: `macgeeequipments@gmail.com`,
					name: `${site.name} <no-reply@${site.domain}>`,
				},
				subject: `New Contact Message`,
				html: htmlEmail,
				params: {
					orderId: "contact",
					customerName: site.name,
				},
			};
			await sendEmail({
				...emailPayload,
				to: site.email,
			});
		} catch (emailError) {
			logger.error("Email sending failed", { error: emailError });
		}

		return NextResponse.json({
			status: true,
			message: "Contact sent successfully",
		});
	} catch (error: any) {
		logger.error("Contact creation failed", { error });

		return handlerNativeResponse(
			{
				status: 500,
				message: "Internal server error",
			},
			500
		);
	}
}
