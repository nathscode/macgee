import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/config/db.config";
import { SKUGenerator } from "@/config/sku";
import { CustomError } from "@/lib/backend/errors";
import { getRandomNumber, handlerNativeResponse } from "@/lib/backend/utils";
import { PartSchema, PartSchemaInfer } from "@/lib/validators/product";
import { ApiResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import {
	determineProductType,
	generateUniqueSlug,
	handleError,
} from "../route";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/actions/getS3Client";
import { getLogger } from "@/lib/backend/logger";

const logger = getLogger();
const Bucket = process.env.TEBI_BUCKET_NAME;
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
		const formData = await req.formData();
		const images: File[] = formData.getAll("images") as File[];
		const title: string = formData.get("title") as string;
		const price: string = formData.get("price") as string;
		const condition: string = formData.get("condition") as string;
		const productType: string = formData.get("productType") as string;
		const currentStock: string = formData.get("currentStock") as string;
		const minimumStock: string = formData.get("minimumStock") as string;
		const manufacturer: string = formData.get("manufacturer") as string;
		const description: string = formData.get("description") as string;

		if (!title || !price || !productType || !condition) {
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: "Missing required fields",
					},
				},
				400
			);
		}
		// 4. Process product type
		const productTyped = determineProductType(productType);

		// 5. Generate unique slug
		const baseSlug = slugify(title, { lower: true });
		const slug = await generateUniqueSlug(baseSlug);

		// 6. Generate SKU
		const skuGenerator = await SKUGenerator.getInstance();
		const sku = await skuGenerator.generateSKU(productTyped);

		// 7. Create product
		const result = await db.$transaction(async (tx) => {
			const newProduct = await db.product.create({
				data: {
					userId: session.id!,
					title: title,
					slug,
					sku,
					description: description,
					productType: productTyped,
					currentStock: Number(currentStock),
					minimumStock: Number(minimumStock),
					manufacturer: manufacturer,
					condition: condition,
					price: price,
				},
			});
			const uploadedImages = await Promise.all(
				images.map(async (image) => {
					const buffer = Buffer.from(await image.arrayBuffer());
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
						productId: newProduct.id,
					};
				})
			);

			if (uploadedImages.length > 0) {
				await tx.media.createMany({
					data: uploadedImages,
					skipDuplicates: true,
				});
			}
			return newProduct;
		});

		return NextResponse.json({ status: "success", slug: result.slug });
	} catch (error) {
		return handleError(error);
	}
}
