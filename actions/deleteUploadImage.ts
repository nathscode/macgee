"use server";
import { db } from "@/config/db.config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import getCurrentUser from "./getCurrentUser";

import { newS3, tebiS3 } from "@/actions/getS3Client";

import {
	UploadEditSchema,
	UploadEditSchemaInfer,
} from "@/lib/validators/product";
import { RoleType } from "@prisma/client";

export async function deleteUploadImage(values: UploadEditSchemaInfer) {
	const session = await getCurrentUser();
	if (!session) {
		return { message: "Unauthorized user" };
	}
	const validatedFields = UploadEditSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Update Post.",
		};
	}

	const { slug, url } = validatedFields.data;
	try {
		const session = await getCurrentUser();

		if (!session) {
			return { message: "Unauthorized" };
		}
		const isAdmin = session?.role === RoleType.ADMIN;
		const isAgent = session?.role === RoleType.MANAGER;
		const canDelete = isAdmin || isAgent;

		if (!canDelete) {
			return { message: "Unauthorized and access denied " };
		}
		const product = await db.product.findFirst({
			where: { slug },
		});

		if (!product) {
			return { message: "product not found." };
		}
		const media = await db.media.findFirst({
			where: { url: url },
		});
		if (!media) {
			return { message: "Media url not found." };
		}

		const isNewProvider = url.includes("de-zlg1.safes3.com");
		const isTebiProvider = url.includes("s3.tebi.io");

		let activeS3Client;
		let activeBucket;

		if (isNewProvider) {
			activeS3Client = newS3;
			activeBucket = process.env.S3_BUCKET_NAME;
		} else if (isTebiProvider) {
			activeS3Client = tebiS3;
			activeBucket = process.env.TEBI_BUCKET_NAME;
		} else {
			return {
				status: "error",
				message: "Unknown image provider.",
				data: null,
			};
		}

		const filename = url.split("/").pop();

		if (media) {
			await db.media.delete({
				where: { id: media.id },
			});
		}

		const params = {
			Bucket: activeBucket,
			Key: `uploads/${filename}`,
		};

		const command = new DeleteObjectCommand(params);
		await activeS3Client.send(command);

		revalidatePath(`dashboard/inventories/product/${product.slug}/upload`);
		return { message: "Image deleted successfully." };
	} catch (error) {
		return { message: "Database Error: Failed to Update booking." };
	}
}
