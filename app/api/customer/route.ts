import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/config/db.config";
import { SKUGenerator } from "@/config/sku";
import { CustomError } from "@/lib/backend/errors";
import {
	generateCryptoString,
	generateRandomString,
	handlerNativeResponse,
	normalizeEmail,
	trimAndLowercase,
} from "@/lib/backend/utils";
import { CustomerSchema, CustomerSchemaInfer } from "@/lib/validators/customer";
import { ProductSchema, ProductSchemaInfer } from "@/lib/validators/product";
import { ApiResponse } from "@/types";
import { ProductType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
	try {
		// 1. Authentication check
		const session = await getCurrentUser();
		if (!session) {
			throw new CustomError("Unauthorized user", 401);
		}

		// 2. Authorization check
		const user = await db.user.findFirst({
			where: { email: session.email },
		});

		if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) {
			throw new CustomError("Not authorized to make this request", 403);
		}

		// 3. Request validation
		const body: CustomerSchemaInfer = await req.json();
		const validatedData = CustomerSchema.safeParse(body);

		if (!validatedData.success) {
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: validatedData.error.message,
					},
				},
				400
			);
		}
		const formattedName = trimAndLowercase(validatedData.data.name);
		const formattedEmail = normalizeEmail(validatedData.data.email);
		const customerNameExist = await db.customer.findFirst({
			where: { name: formattedName },
		});
		if (customerNameExist) {
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: "Customer name already exist",
					},
				},
				400
			);
		}
		const customerEmailExist = await db.customer.findFirst({
			where: { email: formattedEmail },
		});
		if (customerEmailExist) {
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: "Customer Email already exist",
					},
				},
				400
			);
		}
		const customerCode = `CUST-${generateCryptoString(5)}`;
		const customer = await db.customer.create({
			data: {
				code: customerCode,
				name: validatedData.data.name,
				email: validatedData.data.email,
				phone: validatedData.data.phone,
				address: validatedData.data.address,
				taxId: "",
				businessName: validatedData.data.businessName,
			},
		});

		const response: ApiResponse = {
			success: true,
			payload: { id: customer.id },
		};

		return NextResponse.json(response);
	} catch (error) {
		return handleError(error);
	}
}

function handleError(error: unknown): Response {
	console.error("Customer creation error:", error);

	if (error instanceof ZodError) {
		return handlerNativeResponse(
			{
				status: 422,
				errors: {
					message: "Validation error",
					details: error.errors,
				},
			},
			422
		);
	}

	if (error instanceof CustomError) {
		return handlerNativeResponse(
			{
				status: error.status,
				errors: {
					message: error.message,
				},
			},
			error.status
		);
	}

	return handlerNativeResponse(
		{
			status: 500,
			errors: {
				message: "Internal server error",
			},
		},
		500
	);
}
