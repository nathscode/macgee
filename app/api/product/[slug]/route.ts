import { db } from "@/config/db.config";
import { handlerNativeResponse } from "@/lib/backend/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	if (req.method !== "GET") {
		return handlerNativeResponse(
			{ status: 405, errors: { message: "Method not allowed" } },
			405
		);
	}
	try {
		const product = await db.product.findUnique({
			where: { slug: params.slug },
			include: { medias: true, user: true },
		});

		if (!product) {
			return handlerNativeResponse(
				{ status: 404, errors: { message: "Property not found" } },
				404
			);
		}
		return NextResponse.json(product);
	} catch (error) {
		console.log("Error in fetching product slug", error);
		return handlerNativeResponse(
			{ status: 500, errors: { message: "Internal server error" } },
			500
		);
	}
}
