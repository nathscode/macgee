import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/config/db.config";
import { CustomError } from "@/lib/backend/errors";
import { handlerNativeResponse } from "@/lib/backend/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	if (req.method !== "PATCH") {
		return handlerNativeResponse(
			{ status: 405, errors: { message: "Method not allowed" } },
			405
		);
	}
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
	try {
		const product = await db.product.findUnique({
			where: { slug: params.slug },
		});

		if (!product) {
			return handlerNativeResponse(
				{ status: 404, errors: { message: "product not found" } },
				404
			);
		}
		const productUpdateActive = await db.product.update({
			where: {
				slug: params.slug,
			},
			data: {
				isActive: !product.isActive,
			},
		});
		if (productUpdateActive) {
			return NextResponse.json({ success: true });
		}
	} catch (error: any) {
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
}
