import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/config/db.config";
import { SKUGenerator } from "@/config/sku";
import { CustomError } from "@/lib/backend/errors";
import {
	generateRandomString,
	handlerNativeResponse,
} from "@/lib/backend/utils";
import { ProductSchema, ProductSchemaInfer } from "@/lib/validators/product";
import { ApiResponse } from "@/types";
import { ProductType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { ZodError } from "zod";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = Number(searchParams.get("page")) || 1;
		const limit = Number(searchParams.get("limit")) || 16;
		const searchKey = searchParams.get("q");
		const productType = searchParams.get("type");
		const category = searchParams.get("category");

		// Validate pagination parameters
		if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 100) {
			return NextResponse.json(
				{ error: "Invalid pagination values" },
				{ status: 400 }
			);
		}

		const skip = (page - 1) * limit;
		const whereConditions: any = {
			isActive: true,
		};

		// Add search condition if searchKey exists
		if (searchKey) {
			whereConditions.OR = [
				{ name: { contains: searchKey, mode: "insensitive" } },
				{ description: { contains: searchKey, mode: "insensitive" } },
				{ category: { contains: searchKey, mode: "insensitive" } },
			];
		}

		// Add product type filter if exists
		if (productType) {
			whereConditions.productType = productType;
		}

		// Add category filter if exists
		if (category) {
			whereConditions.category = category;
		}

		// Get products with pagination and filters
		const [productQueries, totalCount] = await Promise.all([
			db.product.findMany({
				where: whereConditions,
				skip,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: {
					medias: true,
				},
			}),
			db.product.count({
				where: whereConditions,
			}),
		]);

		// Calculate total pages
		const totalPages = Math.ceil(totalCount / limit);

		return NextResponse.json({
			products: productQueries,
			pagination: {
				currentPage: page,
				totalPages,
				totalItems: totalCount,
				itemsPerPage: limit,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		});
	} catch (error) {
		return handleError(error);
	}
}

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
		const body: ProductSchemaInfer = await req.json();
		const validatedData = ProductSchema.safeParse(body);

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
		// 4. Process product type
		const productType = determineProductType(validatedData.data.productType);

		// 5. Generate unique slug
		const baseSlug = slugify(validatedData.data.title, { lower: true });
		const slug = await generateUniqueSlug(baseSlug);

		// 6. Generate SKU
		const skuGenerator = await SKUGenerator.getInstance();
		const sku = await skuGenerator.generateSKU(productType);

		// 7. Create product
		const product = await db.product.create({
			data: {
				userId: session.id!,
				title: validatedData.data.title,
				slug,
				sku,
				description: validatedData.data.description,
				category: validatedData.data.category,
				productType,
				currentStock: validatedData.data.currentStock,
				minimumStock: validatedData.data.minimumStock,
				manufacturer: validatedData.data.manufacturer,
				model: validatedData.data.model,
				year: validatedData.data.year,
				condition: validatedData.data.condition,
				hours: Number(validatedData.data.hours),
				engineNumber: String(validatedData.data.engineNumber),
				specifications: validatedData.data.specifications,
				isBucket: validatedData.data.isBucket,
				isExterior: validatedData.data.isExterior,
				isRops: validatedData.data.isRops,
			},
		});

		const response: ApiResponse = {
			success: true,
			payload: { slug: product.slug },
		};

		return NextResponse.json(response);
	} catch (error) {
		return handleError(error);
	}
}

export async function PATCH(req: NextRequest) {
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
		const body: ProductSchemaInfer = await req.json();
		const validatedData = ProductSchema.safeParse(body);

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
		// 4. Process product type
		const productType = determineProductType(validatedData.data.productType);
		let newSlug: string = "";
		const existingPropertyId = await db.product.findFirst({
			where: { id: validatedData.data.idUpdate },
		});
		if (
			existingPropertyId &&
			existingPropertyId?.title === validatedData?.data.title
		) {
			newSlug = existingPropertyId.slug!;
		} else {
			let slug = slugify(validatedData?.data.title, { lower: true });

			const existingProperty = await db.product.findFirst({
				where: { slug },
			});

			if (existingProperty) {
				slug += `-${generateRandomString()}`;
			}
			newSlug = slug;
		}
		if (validatedData.data.isUpdate) {
			// 5. Update product
			const updateProduct = await db.product.update({
				where: { id: validatedData.data.idUpdate },
				data: {
					title: validatedData.data.title,
					slug: newSlug,
					description: validatedData.data.description,
					category: validatedData.data.category,
					productType,
					currentStock: validatedData.data.currentStock,
					minimumStock: validatedData.data.minimumStock,
					manufacturer: validatedData.data.manufacturer,
					model: validatedData.data.model,
					year: validatedData.data.year,
					condition: validatedData.data.condition,
					hours: Number(validatedData.data.hours),
					engineNumber: String(validatedData.data.engineNumber),
					specifications: validatedData.data.specifications,
					isBucket: validatedData.data.isBucket,
					isExterior: validatedData.data.isExterior,
					isRops: validatedData.data.isRops,
				},
			});
			if (!updateProduct) {
				return handlerNativeResponse(
					{ status: 400, message: "Error updating product" },
					400
				);
			}
			return NextResponse.json(updateProduct.slug);
		}
	} catch (error) {
		return handleError(error);
	}
}

// Helper functions
export function determineProductType(type?: string): ProductType {
	if (!type) return ProductType.TRUCK;

	const upperType = type.toUpperCase();
	if (upperType === ProductType.TRUCK || upperType === ProductType.PART) {
		return upperType as ProductType;
	}

	return ProductType.TRUCK;
}

export async function generateUniqueSlug(baseSlug: string): Promise<string> {
	const existingProduct = await db.product.findFirst({
		where: { slug: baseSlug },
	});

	if (!existingProduct) return baseSlug;
	return `${baseSlug}-${generateRandomString()}`;
}

export function handleError(error: unknown): Response {
	console.error("Product creation error:", error);

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
