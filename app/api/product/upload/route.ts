import { db } from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";
import { getRandomNumber, handlerNativeResponse } from "@/lib/backend/utils";
import getCurrentUser from "@/actions/getCurrentUser";
import { CustomError } from "@/lib/backend/errors";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/actions/getS3Client";
import { getLogger } from "@/lib/backend/logger";

const logger = getLogger();
const Bucket = process.env.TEBI_BUCKET_NAME;

export async function PATCH(req: NextRequest) {
	if (req.method !== "PATCH") {
		return handlerNativeResponse(
			{ status: 405, errors: { message: "Method not allowed" } },
			405
		);
	}

	try {
		// 1. **Authorization Check**
		const session = await getCurrentUser();
		if (!session) throw new CustomError("Unauthorized user", 401);

		const user = await db.user.findFirst({
			where: { email: session.email },
		});
		if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) {
			throw new CustomError("Not authorized to make this request", 403);
		}

		// 2. **Extract FormData**
		const formData = await req.formData();
		const slug = formData.get("slug") as string;
		const images = formData.getAll("images") as File[];

		if (!slug || images.length === 0) {
			logger.warn("Invalid input data: Missing slug or images");
			return handlerNativeResponse(
				{ status: 400, errors: { message: "Invalid input data" } },
				400
			);
		}

		// 3. **Check if Product Exists**
		const product = await db.product.findFirst({ where: { slug } });
		if (!product) {
			logger.warn(`Product with slug '${slug}' not found`);
			return handlerNativeResponse(
				{ status: 404, errors: { message: "Product not found" } },
				404
			);
		}

		// 4. **Upload Images in Parallel**
		const uploadedImages = await Promise.all(
			images.map(async (image) => {
				try {
					const arrayBuffer = await image.arrayBuffer();
					const buffer = Buffer.from(arrayBuffer);
					const uniqueName = `${Date.now()}_${getRandomNumber(1, 999999)}`;
					const imgExt = image.name.split(".").pop();
					const filename = `${uniqueName}.${imgExt}`;

					const fileParams = {
						Bucket,
						Key: `uploads/${filename}`,
						Body: buffer,
						ContentType: image.type,
					};

					await s3.send(new PutObjectCommand(fileParams));

					return {
						url: `${process.env.NEXT_PUBLIC_TEBI_URL}/uploads/${filename}`,
						productId: product.id,
					};
				} catch (err) {
					logger.error(`Image upload failed for ${image.name}: ${err}`);
					return null;
				}
			})
		);

		// 5. **Filter Out Failed Uploads**
		const validImages = uploadedImages.filter((img) => img !== null);
		if (validImages.length === 0) {
			logger.error("No images were uploaded successfully.");
			return handlerNativeResponse(
				{ status: 500, message: "Image upload failed. Try again." },
				500
			);
		}

		// 6. **Save Uploaded Images to Database**
		await Promise.all(
			validImages.map((img) =>
				db.media.create({
					data: {
						url: img!.url,
						productId: img!.productId,
					},
				})
			)
		);

		logger.info(
			`Successfully uploaded ${validImages.length} images for product ${slug}`
		);

		return NextResponse.json({ status: "success", slug });
	} catch (error: any) {
		logger.error(`Unexpected error: ${error.message}`);
		return handlerNativeResponse({ status: 500, message: error.message }, 500);
	}
}
